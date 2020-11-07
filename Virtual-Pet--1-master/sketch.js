//Create variables here
var dog,happyDog,dogImg,happyDogImg,database,foods,foodStock
var feedTime,lastFed,Feed,addFood,foodObject
function preload()
{
  //load images here
  dogImg=loadImage("images/Dog.png")
  happyDogImg=loadImage("images/happydog.png")
}

function setup() {
  createCanvas(1000,500);
  foodObject=new Food()
  dog=createSprite(250,400)
  dog.addImage(dogImg);
  dog.scale=0.2
database=firebase.database();
foodStock=database.ref("food");
foodStock.on("value",readStock)
Feed=createButton("Feed Bruno")
Feed.position(700,95)
Feed.mousePressed(feedDog)
addFood=createButton("add food")
addFood.position(800,95)
addFood.mousePressed(addFood)
}

function draw() {  
background(46, 139, 87) 
foodObject.display()
feedTime=database.ref("feedTime")
feedTime.on("value",function (data){
  lastFed=data.val()
})
textSize(15)
fill("white")
if(lastFed>=12){
  text("last fed:"+lastFed%12+"pm",350,30)
}
else if(lastFed==0){
  text("last fed: 12 am",350,30)
}else{
  text("last fed:"+lastFed+"am",350,30)
}
/*if(keyWentDown(UP_ARROW)){
  writeStock(foods)
  dog.addImage(happyDogImg)
}
if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg)
}
  //add styles here
  fill("white")
  textSize(30)
  text("press up arrow to feed Bruno",70,50)
  text("food remaining :"+foods,120,100)
  */drawSprites();
}
function readStock(data){
foods=data.val();
foodObject.updateFoodStock(foods)
}
function feedDog(){
  dog.addImage(happyDogImg)
  foodObject.updateFoodStock(foodObject.getFoodStock()-1)
  database.ref("/").update({
    food:foodObject.getFoodStock(),
    feedTime:hour()
  })
}
function addFood(){
  foods++
  database.ref("/").update({
    food:foods
  })
}