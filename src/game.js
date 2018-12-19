import { Game, INVALID_MOVE } from 'boardgame.io/core';
import monstersDeck from './decks/monstersDeck';
import barbarianDeck from './decks/barbarianDeck';

//Turn order from custom not working 
function getNextPlayer(currentPlayer, activePlayers) {
  const currentIndex = activePlayers.indexOf(parseInt(currentPlayer));
  // Set next player from active list unless current is at the end in which case set the first player in the list
  const next = (currentIndex === activePlayers.length - 1) ? activePlayers[0] : activePlayers[currentIndex + 1];

  return next.toString();
}

function getTotalHP(hero, items) {
  let hp = hero.hp;
  const hpItems = items.filter(item => item.type === "Armour");
  //return reduced hpItems with initial value of hp
  return hpItems.reduce( ((acc, cur) => acc + cur.hpBuff), hp);

}

export const WTTD = Game({
  name : "Welcome to the Dungeon",

  setup : (ctx) => ({
    mDeck : ctx.random.Shuffle(monstersDeck),
    heroItems : barbarianDeck,
    hero : {name : "Barbarian", hp : 4},
    dungeon : [],
    dungeonStats : {},
    activeCard : {},
    playerHealth : Array(ctx.numPlayers).fill(2),
    playerVictories : Array(ctx.numPlayers).fill(0),
    activePlayersInRound : Array.from(new Array(ctx.numPlayers), (x,i) => i), //returns an array numbered from 0 up to player count - 1
  }),

  moves : {
    drawCard(G, ctx) {
      // Test to make sure there is a card to draw and that there is no active card
      if(G.mDeck.length > 0 && Object.keys(G.activeCard).length === 0) {
        // Move to decision phase in preperation
        ctx.events.endPhase({next : 'PD_placeOrDiscard'});

        // Move the top card into the active card slot
        return {...G, activeCard : G.mDeck[0], mDeck : G.mDeck.slice(1)}

      } else {
        console.log("You done messed up");
      }
    },
    passTurn(G, ctx)  {
      // Prepare new G
      // eslint-disable-next-line
      const newG = {...G, activePlayersInRound : G.activePlayersInRound.filter(id => id != ctx.currentPlayer)};
  
      // Determine next Phase
      // const next= (newG.activePlayersInRound.length > 1) ? 'PD_drawOrPass' : 'EnterDungeon';

      // Move Phase
      ctx.events.endPhase({next : 'PD_drawOrPass'});

      // End player turn
      ctx.events.endTurn( {next : getNextPlayer(ctx.currentPlayer, [...G.activePlayersInRound]) });

      return newG;
    },
    // Moves active card to the dungeon deck
    addCardToDungeon(G, ctx) {
      // Test for active card
      if(Object.keys(G.activeCard).length > 0) {

        // Move Phase
        ctx.events.endPhase({next : 'PD_drawOrPass'});

      // End player turn
      ctx.events.endTurn( {next : getNextPlayer(ctx.currentPlayer, [...G.activePlayersInRound]) });

        return {...G, dungeon : [G.activeCard, ...G.dungeon], activeCard : {}}
      }
    },
    discardEquipment(G, ctx, itemId) {
      // Check that item is in stack
      const currentIds = G.heroItems.map(item => item.id);
      if (currentIds.includes(itemId)) {
        // Move Phase
        ctx.events.endPhase({next : 'PD_drawOrPass'});

        // End player turn
        ctx.events.endTurn( {next : getNextPlayer(ctx.currentPlayer, [...G.activePlayersInRound]) });

        //Return stack minus item and discard active card
        return {...G, heroItems : G.heroItems.filter(item => item.id !== itemId), activeCard : {}};
      } else {
        // If card isn't in stack do not allow discard
        return INVALID_MOVE;
      }
      
    },

    killMonster(G, ctx, weaponID) {
      const monster = G.activeCard;
      const weapon = (weaponID) ? G.heroItems.find(item => item.id === weaponID) : null;
      let newItems = G.heroItems;
      let hp = G.dungeonStats.currentHP;
      const remainingMonsters = G.dungeon.length;


      // Make sure weapon is usable by checking that the hero has it and it can kill the monster
      if(weaponID) {
        const itemIds = G.heroItems.map(item => item.id);
        
        if (!itemIds.includes(weaponID) || !weapon.canKill(monster)) {
          return INVALID_MOVE;
        }
      }

      if(!weaponID) {
        // reduce player HP
        hp -= monster.strength;
      }
      else if(weapon.singleUse) {
        // discard one time weapons
        newItems = G.heroItems.filter(item => item.id !== weapon.id);
      }

      // Determine next phase
      let next;

      if (hp <= 0) {
        // Dead
        next = 'DungeonHeroDead';
      }
      else if (remainingMonsters === 0) {
        next = 'DungeonCleared';
      }
      else {
        next = 'DungeonRound';
      }

      // next phase
      ctx.events.endPhase({ next });


      return {...G,
        heroItems : newItems, 
        activeCard : {}, 
        dungeonStats : {...G.dungeonStats, currentHP : hp },
      };


    }
  },

  flow : {
    startingPhase : 'PD_drawOrPass',

    phases : {
      PD_drawOrPass : {
        allowedMoves : ['drawCard', 'passTurn']
      },
      PD_placeOrDiscard : {
        allowedMoves : ['addCardToDungeon', 'discardEquipment']
      },
      PrepareDungeon : {
        allowedMoves : [],
        onPhaseBegin : (G, ctx) => {
          const stats = {};
          stats.maxHP = getTotalHP(G.hero, G.heroItems);
          stats.currentHP = stats.maxHP;
          return {...G, dungeonStats : {...stats}};
        }
      },
      DungeonRound : {
        allowedMoves : ['killMonster'],
        onPhaseBegin : (G, ctx) => {
          // Draw card from Dungeon Deck
          return {...G, activeCard : G.dungeon[0], dungeon : G.dungeon.slice(1)};
        }
      },
      DungeonHeroDead : {

      },
      DungeonCleared : {

      },
    }
  }
  
});