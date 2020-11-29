class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = 0;
    // this.temp_rank;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      name:this.name,
      distance:this.distance,
      rank:this.rank,
      index:this.index
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
  async getcarsatend(){
    await database.ref("carsatend").on("value",(data) =>{
     globalRank = data.val();

      
    })
    console.log(globalRank);
  }
  static updatecarsatend(rank){
    database.ref("/").update({
      carsatend: rank
    })
    console.log(rank);
  }
  static remove(){
    database.ref("players").remove();
  }
}
