let geld = 10 //geld en stuff
let geldtijd = 60
let level = 1
let xp = 0
let xptijd = 0

let voedsel1 = 5
let voedsel2 = 1
let voedsel3 = 0
let voedsel4 = 0
let voedsel5 = 0

let voedselplus1 = 0
let voedselplus2 = 0
let voedselplus3 = 0

let water = 100
let medicijnen = 0

//stats
let honger = 80
let hongerSnelheid = -1

let energie = 80
let energieSnelheid = -0.2

let geluk = 80
let gelukSnelheid = -1

let gezond = 80
let gezondSnelheid = -1

//acties
let eten = 0
let etenTijd = 0

let energieoplaad = 0
let energieoplaadtijd = 0

let spelen = false;
let minigame = 0;

let genezen = 0
let genezentijd = 0

let douchen = false
let badderen = false
let medicijn = 0
let medicijntijd = 0

//kleuren

let kubusR = 100
let kubusG = 100
let kubusB = 100
let kubusLicht = true


let dood = false
let preDoodmanier = 0
let doodmanier = 0
let slapen = false
let menu = 0
let winkelMenu = 0

//doodmanieren te veel van iets
let opHolGeslagenGroei = false
let groeiImplosie = false
let groeiFase = 0;
let zwarteGat = false;

let opHolGeslagenEnergie = false
let teVeelEnergie = 0
let energieBoemfase = 0
let energieBoem = 0 //grootte
let energieBoem2 = 0  //transparantie
let geExplodeerd = false

let bAM = false

let saveloadmenu = 0
let resetvraag = false

//doodmanieren te weinig van iets

function setup() {
  createCanvas(1000, 600);
  
  rectMode (CENTER);
  frameRate (60);
}

function preload(){
  icoonvoedsel = loadImage('assets/voedselicoon.png'); //menuplaatjes
  icoonspelen = loadImage('assets/spelenicoon.png');
  icoongezond = loadImage('assets/gezondedingenicoon.png');
  icoonwinkel = loadImage('assets/winkelicoon.png')
  icoonbed = loadImage('assets/bedicoon.png');

  voedsel01 = loadImage('assets/voedsel1.png'); //voedsel
  voedsel02 = loadImage('assets/voedsel2.png');
  voedsel03 = loadImage('assets/voedsel3.png');
  voedsel04 = loadImage('assets/voedsel4.png');
  voedsel05 = loadImage('assets/voedsel5.png');

  voedselplus01 = loadImage('assets/voedselplus1.png');
  voedselplus02 = loadImage('assets/voedselplus2.png');
  voedselplus03 = loadImage('assets/voedselplus3.png');

  douchenaan = loadImage('assets/douchen.png');
  badderenaan = loadImage('assets/badderen.png');
  pil1 = loadImage('assets/pil.png');

  xx = loadImage('assets/x.png');
}

function draw() {
  strokeWeight (0);
  background(255, 200, 150);

  if (opHolGeslagenGroei == false && geExplodeerd == false){
  Huisdier();
  }

  if (douchen == true || badderen == true){
    strokeWeight (0);
    DouchenEnBadderen();
  }

if (dood == false) {
  Geld();
  Level();
  textSize (20);
  Honger();
  Energie();
  Geluk();
  Gezond();
  Menus();

  if (etenTijd != 0){
    Eten();
  }
  if (energieoplaadtijd != 0){
    Energieopladen();
  }
  if (spelen == true){
    Spelen();
  }
  if (minigame == 1){
    Minigame1();
  }
  if (genezentijd != 0){
    Genees();
  }
}
if (zwarteGat == true){
  ZwarteGat();
}

 if (opHolGeslagenGroei == true || opHolGeslagenEnergie == true){
  if (geExplodeerd == false){
     Huisdier();
  }

  if (opHolGeslagenGroei == true){
    OngecontroleerdGegroei();
    preDoodmanier = 1;
  }
  }
  if (opHolGeslagenEnergie == true){
    EnergyOVERLOAD();
    preDoodmanier = 2;
  }

  if (honger <= 0 || honger >= 500 || energie >= 500 || geluk <= 0 || gezond <= 0 ){
    DOODoorzaak();
    //print ('oh nee');
  }
  RESETMENU();

 // Muislocatie();
}
//hoi
function Huisdier(){

  strokeWeight (0);
  if (energie >= 100 && dood == false){ //hoge energie
    strokeWeight (pow(honger, 0.5));
    stroke (255, 255, (energie-100)*2.25/3);
  }

  fill (kubusR, kubusG, kubusB);
  rect (500, 250, (pow(honger, 0.5))*20, pow(honger, 0.5)*20);
  if (kubusR >= 100 && kubusG >= 100 && kubusB >= 100){
    fill (0);
    kubusLicht = true;
  }
  else{
    fill (255);
    kubusLicht = false;
  }
  

  //mond
  if (dood == false){
    if (geluk >= 66 && gezond >= 25){ //blij
      rect (500, 250+(pow(honger, 0.5))*7,(pow(honger, 0.5)*10), (pow(honger, 0.5)*2));
      rect (500+(pow(honger, 0.5)*6), 250+(pow(honger, 0.5))*5,(pow(honger, 0.5)*2), (pow(honger, 0.5)*2));
      rect (500-(pow(honger, 0.5)*6), 250+(pow(honger, 0.5))*5,(pow(honger, 0.5)*2), (pow(honger, 0.5)*2));
    }

    else if (geluk >= 33 && gezond >= 25){ //neutraal
      rect (500, 250+(pow(honger, 0.5))*6,(pow(honger, 0.5)*14), (pow(honger, 0.5)*2));
    }

    else if (geluk < 33 || gezond < 25){ //verdrietig
        rect (500, 250+(pow(honger, 0.5))*5,(pow(honger, 0.5)*10), (pow(honger, 0.5)*2));
        rect (500+(pow(honger, 0.5)*6), 250+(pow(honger, 0.5))*7,(pow(honger, 0.5)*2), (pow(honger, 0.5)*2));
        rect (500-(pow(honger, 0.5)*6), 250+(pow(honger, 0.5))*7,(pow(honger, 0.5)*2), (pow(honger, 0.5)*2));
    }

    if (gezond < 25){ //ziek
      fill (255, 0, 0, 50);
      rect (500, 250, (pow(honger, 0.5))*20, pow(honger, 0.5)*20);
    }

    //ogen
    if (slapen == false){
    strokeWeight ((pow(honger, 0.5))*0.5);
    stroke (255);
      if (kubusLicht == true){
        fill (0, 250, 150);
      }
      else{
        fill (100, 50, 0);
      }
      
      rect (500-(pow(honger, 0.5)*5), 250-(pow(honger, 0.5))*6,(pow(honger, 0.5)*2), (pow(honger, 0.5)*2));
      rect (500+(pow(honger, 0.5)*5), 250-(pow(honger, 0.5))*6,(pow(honger, 0.5)*2), (pow(honger, 0.5)*2));

      if (energie < 25 || gezond < 25){
        strokeWeight (0);
       fill (kubusR, kubusG, kubusB);
        rect (500-(pow(honger, 0.5)*5), 250-(pow(honger, 0.5))*7,(pow(honger, 0.5)*3), (pow(honger, 0.5)*1.8));
        rect (500+(pow(honger, 0.5)*5), 250-(pow(honger, 0.5))*7,(pow(honger, 0.5)*3), (pow(honger, 0.5)*1.8));
      }
    }

    else {
      rect (500-(pow(honger, 0.5)*5), 250-(pow(honger, 0.5))*6,(pow(honger, 0.5)*4), (pow(honger, 0.5)*1));
      rect (500+(pow(honger, 0.5)*5), 250-(pow(honger, 0.5))*6,(pow(honger, 0.5)*4), (pow(honger, 0.5)*1));
    }

  }
  //text (round(pow(honger, 0.5))*20, 100, 100);

}

function Geld(){
  textSize (30);
  strokeWeight (5);
  fill (255, 255, 0);
  stroke (200, 200, 0);
  text ('Geld: ' + geld, 20, 100);
  geldtijd -= 1
  if (geldtijd <= 0){
  geldtijd = 0
    if (level == 1){geld += 1}
    if (level == 2){geld += 5}
    if (level == 3){geld += 30}
    if (level == 4){geld += 100}
    if (level == 5){geld += 250}
    if (level == 6){geld += 1000}
    geldtijd = 60;
  }
  
}

function Level(){
  fill (0, 150, 200);
  stroke (0, 100, 160);
  text ('Level: ' + level, 20, 140);
  strokeWeight (0);
  fill (0);
  rect (110, 170, 200, 36);

  if (level == 1 && xp >= 25){level = 2; xp -= 25}
  if (level == 2 && xp >= 100){level = 3; xp -= 100}
  if (level == 3 && xp >= 350){level = 4; xp -= 350}
  if (level == 4 && xp >= 1000){level = 5; xp -= 1000}
  if (level == 5 && xp >= 10000){level = 6; xp -= 10000}

  if (level == 1){ 
    fill (0, 220, 170);
    rect (10 + (xp/25*100), 170, (xp/25*200), 36);
    fill (255);
    text ('xp: '+ xp + '/25', 20, 180);
  }
  if (level == 2){ 
    fill (0, 220, 170);
    rect (10 + (xp/100*100), 170, (xp/100*200), 36);
    fill (255);
    text ('xp: '+ xp + '/100', 20, 180);
  }
  if (level == 3){ 
    fill (0, 220, 170);
    rect (10 + (xp/350*100), 170, (xp/350*200), 36);
    fill (255);
    text ('xp: '+ xp + '/350', 20, 180);
  }
  if (level == 4){ 
    fill (0, 220, 170);
    rect (10 + (xp/1000*100), 170, (xp/1000*200), 36);
    fill (255);
    text ('xp: '+ xp + '/1000', 20, 180);
  }
  if (level == 5){ 
    textSize (20);
    fill (0, 220, 170);
    rect (10 + (xp/10000*100), 170, (xp/10000*200), 36);
    fill (255);
    text ('xp: '+ xp + '/10000', 20, 177);
  }
  if (level == 6){ 
    fill (0, 220, 170);
    rect (10 + (xp/25*100), 170, (xp/25*200), 36);
    fill (255);
    text ('xp: '+ xp, 20, 180);
  }
}

function Honger(){ //lichtbruine naar rode balk
if (honger <= 100){
honger += hongerSnelheid/240
}
else {
  honger += hongerSnelheid /60
}

strokeWeight (0);
fill (150);
rect (850, 200, 210, 30);

if (honger < 100 && honger > 0){
  fill (150, 100, 0);
  rect (850+ (honger-100), 200, honger*2, 20);
  text ('Voedsel ' + round(honger), 750, 180);

}
else if (honger >= 100 && honger <= 500){
  fill (150, 100, 0);
  rect (850, 200, 200, 20);

  fill (200, 0, 0);
  rect (750+ ((honger-100)/4), 200, (honger-100)*0.5, 20);
  text ('Voedsel ' + round(honger), 750, 180);
}
if (honger < 20 && energie > honger){
    energieSnelheid = -50
  }
  else if (honger < 20){
    energieSnelheid = 0
  }
  if (honger < 20 && gezond > honger*2+5){
    gezondSnelheid = -50
  }
  else if (honger < 20){
    gezondSnelheid = -1
  }
}

function Energie(){ //gele en witte balk
  energie += energieSnelheid/240
if (energie > 100){
energie -= 1/120
}

strokeWeight (0);
fill (150);
rect (850, 260, 210, 30);

if (energie <= 100 && energie > 0){
  fill (255, 255, 0);
  rect (850+ (energie-100), 260, energie*2, 20);
  text ('Energie ' + round(energie), 750, 240);
}
else if (energie >= 100 && energie <= 500){
  fill (255, 255, 0);
  rect (850, 260, 200, 20);

  fill (255);
  rect (750+ ((energie-100)/4), 260, (energie-100)*0.5, 20);
  text ('Energie ' + round(energie), 750, 240);
}
if (energie < 0 && dood == false){
  spelen = false;
  badderen = false;
  douchen = false;
  slapen = true;
  energie = 0;
  hongerSnelheid = -0.2;
  energieSnelheid = 4;
  gelukSnelheid = -0.5;
  gezondSnelheid = 0.5;
  menu = 0;
}

}

function Geluk(){ //groene balk
geluk += gelukSnelheid/240

strokeWeight (0);
fill (150);
rect (850, 320, 210, 30);

if (geluk > 0){
  fill (0, 255, 0);
  rect (850+ (geluk-100), 320, geluk*2, 20);
  text ('Geluk ' + round(geluk), 750, 300);
}

if (geluk > 100){
  geluk = 100;
}

}

function Gezond(){ //blauwe balk
gezond += gezondSnelheid/240

strokeWeight (0);
fill (150);
rect (850, 380, 210, 30);

if (gezond > 0){
  fill (0, 200, 255);
  rect (850+ (gezond-100), 380, gezond*2, 20);
  text ('Gezond ' + round(gezond), 750, 360);
}

if (gezond > 100){
  gezond = 100;
}
}

//Acties
function Eten(){
  if (etenTijd > 0){
    honger += eten/6;
    etenTijd -= 1/60
  }
  if (etenTijd < 0 || honger >= 500){
    eten = 0;
    etenTijd = 0;
  }
}

function Energieopladen(){
   if (energieoplaadtijd > 0){
    
    energieoplaadtijd -= 1/60
    energie += energieoplaad/6;
  }
  if (energieoplaadtijd < 0){
    energieoplaad = 0;
    energieoplaadtijd = 0;
  }
}

function Spelen(){
  if (spelen == true){
  if (honger <= 100){honger -= 1/180;}
  else {honger -= 2/90;}
  if (energie <= 100){energie -= 2/120;}
  else {energie -= 4/60;}
  geluk +=3/120 ;
  douchen = false;
  badderen = false;
  xptijd -=1
  if (xptijd <= 0){
    xptijd = 60;
    xp += 1;
  } 
  }
}

function Minigame1() {

}


function Genees(){
    if (genezentijd > 0){
    gezond += genezen/6;
    genezentijd -= 1/60;
    print ('genezen');
  }
  if (genezentijd < 0){
    genezen = 0;
    genezentijd = 0;
  }
}

function DouchenEnBadderen(){
  if (douchen == true){
    water -= 10/60;
    gezond += 2/60
    spelen = false;

    if (water <0){
      water =0;
      douchen = false;
    }
    fill (150);
    quad (450, 0, 550, 0, 650, 50, 350, 50);
    fill (0, 200, 250, 150);
    rect (500, 325, 30, 550);
    rect (450, 325, 30, 550);
    rect (400, 325, 30, 550);
    rect (550, 325, 30, 550);
    rect (600, 325, 30, 550);
  }

  if (badderen == true){
    gezond += 1.5/60;
    fill (200);
    rect (500, 425, 320, 50);
    rect (680, 350, 50, 200);
    rect (320, 350, 50, 200);
    fill (0, 200, 200, 125);
    rect (500, 335, 310, 130);
      if (honger >= 200){
      badderen = false;
    }
  }
  

   xptijd -=1;

    if (xptijd <= 0){
      xptijd = 60;
      if (douchen == true){
      xp += 3;
      }
      if (badderen == true){
      xp += 2;
      }
    }
}




function DOODoorzaak(){
  if (honger > 500) { //doodoorzaak 1
    opHolGeslagenGroei = true
  }
  if (energie > 500){ //doodoorzaak 2
    opHolGeslagenEnergie = true;
  }
  if (honger < 0 || geluk < 0 || gezond < 0){doodmanier = 4, dood = true}
}

function OngecontroleerdGegroei(){
  if (preDoodmanier == 1 && dood == false){
    opHolGeslagenGroei = true
  }
  if (opHolGeslagenGroei == true && groeiFase == 0){
    hongerSnelheid += honger*honger/25000
    //print ('e')
  }
      strokeWeight (0);
// text (round(honger), 100, 100);
  if (honger > 10000){
    groeiImplosie = true;
    hongerSnelheid = -honger*0.3 - 10;
    groeiFase = 1;
    geluk = 20;
  }
  if (honger < 1200 && groeiFase == 1){
    zwarteGat = true
  }
  if (honger < 0 && groeiFase == 1){
    hongerSnelheid = 0;
    honger = 0;
    groeiImplosie = false;
    dood = true;
    doodmanier = 1;
    preDoodmanier = 0;
  }
}

function ZwarteGat(){
    fill (0, 50);
    circle (500, 250, 420);
    circle (500, 250, 350);
    circle (500, 250, 290);
    circle (500, 250, 230);
    circle (500, 250, 180);
    circle (500, 250, 140);
    circle (500, 250, 105);
    circle (500, 250, 75);
    circle (500, 250, 50);
    circle (500, 250, 30);
}

function EnergyOVERLOAD(){

  if (preDoodmanier == 2 && dood == false){
    slapen = false
    teVeelEnergie += 100/60
    fill (255, 0, 0, teVeelEnergie);
    if (teVeelEnergie > 100){
      fill (255, (teVeelEnergie-100)*1.5, (teVeelEnergie-100)*1.5, teVeelEnergie);
    }

    rect (500, 250, (pow(honger, 0.5))*20, pow(honger, 0.5)*20);
  }
  if (teVeelEnergie > 255){
    if (energieBoemfase == 0){
    energieBoemfase = 1
    energieBoem2 = 100
    }

    if (energieBoemfase == 1){
      energieBoem += 25
      energieBoem2 +=5
      if (energieBoem> 700){
        energieBoemfase = 2;
        dood = true;
        geExplodeerd = true;
        badderen = false;
        if (doodmanier == 0 && bAM == false){
        doodmanier = 2;
        }
        else {
          doodmanier = 3;
        }
      }
    }
    if (energieBoemfase == 2){
      energieBoem += 25-((energieBoem-700)/40)
      energieBoem2 -=2
      if (energieBoem2 < 0){
        energieBoemfase = 0;
        teVeelEnergie = 0;
        energieBoem = 0;
        preDoodmanier = 0;
        slapen = false;
      }
    }
    
  }

  strokeWeight (energieBoem/4); //explosie-effect
  stroke (255, 0, 0, energieBoem2);
  fill (255, 100, 0, energieBoem2);
  circle (500, 250, energieBoem);

}



function Menus(){
  strokeWeight (0);

  fill (150);
  rect (500, 540, 480, 120);

  fill (kubusR, kubusG, kubusB);
  rect (325, 560, 70, 80); //kleur
  fill (150);
  rect (325, 560, 40, 50);
  ellipse (325, 585, 40, 20);
  ellipse (325, 535, 40, 20);
  fill (kubusR, kubusG, kubusB);
  ellipse (325, 535, 35, 15);

  fill (100, 50, 0);
  rect (395, 560, 70, 80); //voedsel
  image (icoonvoedsel, 373, 535, 50, 50);

  fill (255, 255, 0);
  rect (465, 560, 70, 80); //spelen
  image (icoonspelen, 440, 535, 50, 50);

  fill (0, 200, 255);
  rect (535, 560, 70, 80); //schoonmaken / medicijnen
  image (icoongezond, 505, 535, 60, 60);

  fill (0, 0, 200);
  rect (605, 560, 70, 80); //slapen
  image (icoonbed, 587, 535, 36, 50);

  fill (0, 255, 0); 
  rect (675, 560, 70, 80); //winkel
  image (icoonwinkel, 650, 535, 50, 50);

  fill (0, 255, 0);
  rect (57, 490, 116, 60); //save
  fill (255, 0, 0);
  rect (173, 490, 116, 60); //load

  textSize (40);
  fill (0, 150, 0);
  text ('Save',10, 500);

  fill (150, 0, 0);
  text ('Load',130, 500);


  if (slapen == true){
    fill (0, 100);
    rect (500, 300, 1000, 600);
  }

  if (menu == 1){ //etenlijst
    fill (100, 50, 0);
    rect (500, 420, 400, 160);
    triangle (395, 520, 360, 500, 430, 500);

    strokeWeight(10);
    stroke (125, 62, 0);
    rect (340, 460, 60, 60);
    if (voedsel1 > 0){image (voedsel01, 320, 440, 40, 40);} else {image (xx, 315, 435, 50, 50)}
    rect (420, 460, 60, 60);
    if (voedsel2 > 0){image (voedsel02, 400, 455, 40, 10);} else {image (xx, 395, 435, 50, 50)}
    rect (500, 460, 60, 60);
    if (voedsel3 > 0){image (voedsel03, 480, 455, 40, 10);} else {image (xx, 475, 435, 50, 50)}
    rect (580, 460, 60, 60);
    if (voedsel4 > 0){image (voedsel04, 560, 455, 40, 10);} else {image (xx, 555, 435, 50, 50)}
    rect (660, 460, 60, 60);
    if (voedsel5 > 0){image (voedsel05, 640, 440, 40, 40);} else {image (xx, 635, 435, 50, 50)}

    rect (370, 380, 110, 60);
    if (voedselplus1 > 0){image (voedselplus01, 350, 362, 40, 36);} else {image (xx, 345, 355, 50, 50)}
    rect (500, 380, 110, 60);
    if (voedselplus2 > 0){image (voedselplus02, 480, 360, 40, 40);} else {image (xx, 475, 355, 50, 50)}
    rect (630, 380, 110, 60);
    if (voedselplus3 > 0){image (voedselplus03, 610, 356, 40, 50);} else {image (xx, 605, 355, 50, 50)}
    //inhoud van voedsel
    strokeWeight (0);
    textSize (15);

    fill (255);
    if (voedsel1 <= 0){fill (255, 0, 0);}
    text (voedsel1, 320, 482);

    fill (255);
    if (voedsel2 <= 0){fill (255, 0, 0);}
    text (voedsel2, 400, 482);

    fill (255);
    if (voedsel3 <= 0){fill (255, 0, 0);}
    text (voedsel3, 480, 482);

    fill (255);
    if (voedsel4 <= 0){fill (255, 0, 0);}
    text (voedsel4, 560, 482);

    fill (255);
    if (voedsel5 <= 0){fill (255, 0, 0);}
    text (voedsel5, 640, 482);

    fill (255);
    if (voedselplus1 <= 0){fill (255, 0, 0);}
    text (voedselplus1, 325, 402);

    fill (255);
    if (voedselplus2 <= 0){fill (255, 0, 0);}
    text (voedselplus2, 455, 402);

    fill (255);
    if (voedselplus3 <= 0){fill (255, 0, 0);}
    text (voedselplus3, 585, 402);
  }

  if (menu == 2){//spelen
    fill (255, 255, 0);
    rect (460, 460, 160, 80);
    triangle (465, 520, 430, 500, 500, 500);
    strokeWeight (10);
    stroke (200, 200, 0);
    rect (420, 460, 60, 60);
    rect (500, 460, 60, 60);
  }

  if (menu == 3){//medicijnen en schoonmaken
  fill (0, 200, 255);
    rect (500, 440, 240, 120);
    triangle (535, 520, 500, 500, 570, 500);
    strokeWeight (10);
    stroke (0, 150, 200);
    rect (420, 460, 60, 60);
    if (water >= 100 || douchen == true){image (douchenaan, 400, 440, 40, 40);} else {image (xx, 395, 435, 50, 50)}
    
    rect (500, 460, 60, 60);
    if (honger <= 200){
    if (water >= 250 || badderen == true){image (badderenaan, 480, 440, 40, 40);} else {image (xx, 475, 435, 50, 50)}
    } else {image (xx, 475, 435, 50, 50)}

    rect (580, 460, 60, 60);
    if (medicijnen > 0 ){image (pil1, 560, 440, 40, 40);} else {image (xx, 555, 435, 50, 50)}
    //&& douchen == false && spelen == false
    strokeWeight (0);
    textSize (15);
    fill (0);
    if (medicijnen <= 0){fill (255, 0, 0);}
    text (medicijnen, 560, 482);

    textSize (25);
    fill (0, 120, 120);
    if (water <= 0){fill (255, 0, 0);}
    text ('Water: '+round(water)+ 'L', 400, 415);
  }

  // menu 4 verfen
  if (menu == 4){
    strokeWeight (0);
    fill (200);
    rect (325, 400, 240, 180);
    triangle (325, 520, 290, 490, 360, 490);
    textSize (20);

    fill (kubusR, 0, 0);
    text ('R:' +kubusR, 220, 335);
    fill (0, kubusG, 0);
    text ('G:' +kubusG, 300, 335);
    fill (0, 0, kubusB);
    text ('B:' +kubusB, 380, 335);

    textSize (15);
    fill (0);
    text ('-100', 210, 360);
    fill (0);
    text ('-10', 250, 360);
    fill (0);
    text ('-1', 300, 360);
    fill (0);
    text ('1', 340, 360);
    fill (0);
    text ('10', 377, 360);
    fill (0);
    text ('100', 413, 360);

    fill (0); //rood
    rect (225, 380, 40, 20);
    fill (50, 0, 0);
    rect (265, 380, 40, 20);
    fill (100, 0, 0);
    rect (305, 380, 40, 20);
    fill (150, 0, 0);
    rect (345, 380, 40, 20);
    fill (200, 0, 0);
    rect (385, 380, 40, 20);
    fill (255, 0, 0);
    rect (425, 380, 40, 20);

    fill (0); //groen
    rect (225, 420, 40, 20);
    fill (0, 50, 0);
    rect (265, 420, 40, 20);
    fill (0, 100, 0);
    rect (305, 420, 40, 20);
    fill (0, 150, 0);
    rect (345, 420, 40, 20);
    fill (0, 200, 0);
    rect (385, 420, 40, 20);
    fill (0, 255, 0);
    rect (425, 420, 40, 20);

     fill (0); //blauw
    rect (225, 460, 40, 20);
    fill (0, 0, 50);
    rect (265, 460, 40, 20);
    fill (0, 0, 100);
    rect (305, 460, 40, 20);
    fill (0, 0, 150);
    rect (345, 460, 40, 20);
    fill (0, 0, 200);
    rect (385, 460, 40, 20);
    fill (0, 0, 255);
    rect (425, 460, 40, 20);
    
  }
    //menu 5 winkel
  if (menu == 5){
    rect (500, 460, 400, 80);
    triangle(665, 520, 700, 500, 630, 500);

    strokeWeight (10);

    stroke (125, 62, 0);
    rect (370, 460, 110, 60);
    image (voedsel01, 370, 440, 40, 40);
    stroke (200, 150, 0);
    rect (500, 460, 110, 60);
    image (voedselplus01, 510, 440, 40, 40);
    stroke (0, 150, 150);
    rect (630, 460, 110, 60);
    image (pil1, 637, 440, 40, 40);

    strokeWeight (0);
    fill (255);
    textSize (20);
    text ('Eten', 322, 455);
    text ('Eten', 452, 455);
    text ('Maken', 452, 480);
    text ('Water', 582, 455);
    text ('Pillen', 582, 480);
    

    if (winkelMenu == 1){ //voedselwinkel
      strokeWeight (0);
      fill (100, 66, 0);
      rect (500, 220, 300, 400);
      stroke (125, 62, 0);
      strokeWeight (10);
      rect (500, 60, 280, 60);
      rect (500, 140, 280, 60);
      rect (500, 220, 280, 60);
      rect (500, 300, 280, 60);
      rect (500, 380, 280, 60);

      
      strokeWeight (0);
      fill (255);
      textSize (15);
      text ('Kwaliteid: voedsel: 0.5 energie 0.5 xp: 1', 365, 95);
      fill (255, 255, 0);
      if (geld < 5){fill (255, 0, 0)}
      textSize (30);
      text ('5 geld =', 380, 70);
      image (voedsel01, 500, 35, 40, 40);

      fill (255);
      textSize (15);
      text ('Kwaliteid: voedsel: 2.5 energie 2.5 xp: 5', 365, 175);
      fill (255, 255, 0);
      if (geld < 25){fill (255, 0, 0)}
      textSize (30);
      text ('25 geld =', 380, 150);
      image (voedsel02, 510, 130, 40, 10);
      
      fill (255);
      textSize (15);
      text ('Kwaliteid: voedsel: 6 energie 2.4 xp: 20', 365, 255);
      fill (255, 255, 0);
      if (geld < 300){fill (255, 0, 0)}
      textSize (30);
      text ('300 geld =', 380, 230);
      image (voedsel03, 520, 210, 40, 10);

      fill (255);
      textSize (15);
      text ('Kwaliteid: voedsel: 0.75 energie 5 xp: 50', 365, 335);
      fill (255, 255, 0);
      if (geld < 800){fill (255, 0, 0)}
      textSize (30);
      text ('800 geld =', 380, 310);
      image (voedsel04, 520, 290, 40, 10);

      fill (255);
      textSize (15);
      text ('Kwaliteid: voedsel: 3.5 energie 3.5 xp: 30', 365, 415);
      fill (255, 255, 0);
      if (geld < 400){fill (255, 0, 0)}
      textSize (30);
      text ('400 geld =', 380, 390);
      image (voedsel05, 520, 355, 40, 40);

    }
    if (winkelMenu == 2){ //voedsel maken
      strokeWeight (0);
      fill (200, 200, 50);
      rect (500, 300, 300, 240);
      stroke (200, 150, 0);
      strokeWeight (10);
      rect (500, 220, 280, 60);
      rect (500, 300, 280, 60);
      rect (500, 380, 280, 60);
      strokeWeight (0);
      
      fill (255);
      textSize (15);
      text ('Kwaliteid: voedsel: 2,25 energie 1,95 xp: 10', 365, 255);
      fill (0, 255, 0);
      if (voedsel2 < 5){fill (255, 0, 0);}
      textSize (30);
      text ('5      +', 380, 230);
      if (voedsel3 < 1){fill (255, 0, 0);} else {fill (0, 255, 0);}
      text ('1      = 10', 460, 230);
      image (voedsel02, 400, 215, 40, 10);
      image (voedsel03, 480, 215, 40, 10);
      image (voedselplus01, 590, 200, 40, 40);

      fill (255);
      textSize (15);
      text ('Kwaliteid: voedsel: 25 energie 15 xp: 250', 365, 335);
      fill (0, 255, 0);
      if (voedsel1 < 5){fill (255, 0, 0);}
      textSize (20);
      text ('5      +', 380, 310);
      if (voedsel3 < 2){fill (255, 0, 0);} else {fill (0, 255, 0);}
      text ('2      +', 440, 310);
      if (voedsel5 < 1){fill (255, 0, 0);} else {fill (0, 255, 0);}
      text ('1      =', 500, 310);
      image (voedsel01, 395, 290, 26, 26);
      image (voedsel03, 455, 300, 26, 6);
      image (voedsel05, 515, 290, 26, 26);
      image (voedselplus02, 570, 280, 40, 40);
      
      fill (255);
      textSize (15);
      text ('Kwaliteid:NEE', 365, 415);
      fill (0, 255, 0);
      if (voedsel4 < 25){fill (255, 0, 0);}
      textSize (30);
      text ('25      =', 380, 390);
      image (voedsel05, 420, 355, 40, 40);
      image (voedselplus03, 490, 355, 40, 50);


    }
    if (winkelMenu == 3){ //voedsel maken
      strokeWeight (0);
      fill (0, 200, 150);
      rect (500, 260, 300, 320);
      stroke (0, 150, 150);
      strokeWeight (10);
      rect (500, 140, 280, 60);
      rect (500, 220, 280, 60);
      rect (500, 300, 280, 60);
      rect (500, 380, 280, 60);

      strokeWeight (0);
      fill (255, 255, 0);
      if (geld < 25){fill (255, 0, 0)}
      textSize (30);
      text ('25 geld = 50 water', 375, 150);

      fill (255, 255, 0);
      if (geld < 100){fill (255, 0, 0)}
      textSize (27);
      text ('100 geld = 300 water', 375, 230);

      fill (255, 255, 0);
      if (geld < 250){fill (255, 0, 0)}
      textSize (25);
      text ('250 geld = 1000 water', 375, 310);

      fill (255);
      textSize (15);
      text ('Kwaliteid: genezen: 5 xp: 150', 365, 415);
      fill (255, 255, 0);
      if (geld < 250){fill (255, 0, 0)}
      textSize (30);
      text ('1200 geld = ', 375, 390);
      image (pil1, 540, 360, 40, 40);

    }
  }

  if (saveloadmenu != 0){
    SaveEnLoadMenu();
  }

}

function SaveEnLoadMenu(){
  if (saveloadmenu == 1){ //save
    fill (0, 255, 0);
    rect (425, 300, 150, 200);
    fill (255, 0, 0);
    rect (575, 300, 150, 200);

    strokeWeight (10);
    stroke (0, 200, 0);
    fill (0, 255, 0);
    rect (420, 350, 120, 50);
    fill (255, 0, 0);
    stroke (200, 0, 0);
    rect (580, 350, 120, 50);

    strokeWeight (0);
    textSize (40);
    fill (100, 100, 0);
    text ('Save? Load?', 385, 250)
    fill (0, 150, 0);
    text ('Save', 375, 365);
    fill (150, 0, 0);
    text ('Load', 535, 365);
  }
}

function RESETMENU(){
  strokeWeight (0);
  fill (50); //Resetknop
  rect (115, 560, 230, 80);
  textSize (30);
  fill (255, 0, 0);
  strokeWeight (10);
  stroke (150, 0, 0);
  text ('RESET SPEL', 20, 570);
  strokeWeight (0);

    if (resetvraag == true){
      fill (50, 0, 0);
      rect (500, 300, 500, 300);
      textSize (55);
      strokeWeight (10);
      fill (255, 0, 0);
      text ('!Waarschuwing!', 305, 250);
      strokeWeight (0);
      textSize (20);
      text ('Als je op "JA" klikt reset het ALLE stats!', 320, 300);
      strokeWeight (10);
      stroke (255, 0, 0);
      fill (100, 0, 0);
      rect (350, 370, 120, 60);

      strokeWeight (10);
      stroke (0, 255, 0);
      fill (0, 100, 0);
      rect (650, 370, 120, 60);

      strokeWeight (0);
      textSize (40);
      fill (255, 0, 0);
      text ('JA', 325, 385);

      strokeWeight (0);
      textSize (40);
      fill (0, 255, 0);
      text ('NEE', 610, 385);
  }
}

function mousePressed(){
if (Knop(570, 640, 520, 600) && menu == 0){
  if (slapen == false){ //slaapknop
    slapen = true
    hongerSnelheid = -0.2;
    energieSnelheid = 4;
    gelukSnelheid = -0.5;
    gezondSnelheid = 0.5;
    douchen == false;
    spelen == false;
  }
  else if (energie >= 10){
    slapen = false
    hongerSnelheid = -1;
    energieSnelheid = -0.2;
    gelukSnelheid = -1;
    gezondSnelheid = -1;
  }
}

if (slapen == false && resetvraag == false){
  //menus
  if (Knop(360, 430, 520, 600)){ //eten
    if (menu != 1){
      menu = 1
      print ('1')
    }
    else{
      menu = 0
      print ('0')
    }
  }
  
    if (Knop(430, 500, 520, 600)){ //spelen
    if (menu != 2){
      menu = 2
      print ('2')
    }
    else{
      menu = 0
      print ('0')
    }
  }

    if (Knop(500, 570, 520, 600)){ //gezonde dingen
    if (menu != 3){
      menu = 3
      print ('3')
    }
    else{
      menu = 0
      print ('0')
    }
  }

    if (Knop(290, 360, 520, 600)){ //kleuren
    if (menu != 4){
      menu = 4
      print ('4')
    }
    else{
      menu = 0
      print ('0')
    }
  }

     if (Knop(640, 710, 520, 600)){ //winkel
    if (menu != 5){
      menu = 5
      print ('5')
    }
    else{
      menu = 0
      print ('0')
    }
  }

 
}

//Save en Load
if (menu == 0 && minigame == 0 && preDoodmanier == 0 && doodmanier == 0 && dood == false){
  if (Knop(0, 230, 460, 520)){
    if (saveloadmenu != 1){
      saveloadmenu = 1;
    }
    else {
      saveloadmenu = 0;
      print ('test');
    }
  }
}

if (minigame == 0){ //reset spel
  if (Knop(0, 230, 520, 600)){
    if (resetvraag == false){
      resetvraag = true
      menu = 0
      winkelMenu = 0
    }
    else {
      resetvraag = false
    }
  }
}

//menu 1 voedsel
  if (menu == 1 && etenTijd == 0 && douchen == false){
    if (Knop(310, 370, 430, 490) && voedsel1 > 0){ //voedsel1 blad sla
      voedsel1 -= 1;
      print ('nom');
      eten = 1;
      etenTijd = 0.5;
      energieoplaad = 1;
      energieoplaadtijd = 0.5;
      xp += 1;
    }
  
    if (Knop(390, 450, 430, 490) && voedsel2 > 0){ //voedsel2 vlees
      voedsel2 -= 1;
      print ('NOM');
      eten = 1;
      etenTijd = 2.5;
      energieoplaad = 1;
      energieoplaadtijd = 2.5;
      xp += 5;
    }

    if (Knop(470, 530, 430, 490) && voedsel3 > 0){ //voedsel3 groot brood
      voedsel3 -= 1;
      print ('NOOOOM');
      eten = 1;
      etenTijd = 6;
      energieoplaad = 0.4;
      energieoplaadtijd = 6;
      xp += 20;
    }

    if (Knop(550, 610, 430, 490) && voedsel4 > 0){ //voedsel4 buskruit
      voedsel4 -= 1;
      print ('BUUUUUURP');
      eten = 1.5;
      etenTijd = 0.5;
      energieoplaad = 10;
      energieoplaadtijd = 0.5;
      xp += 50;
    }

    if (Knop(630, 690, 430, 490) && voedsel5 > 0){ //voedsel5 kaasstuk
      voedsel5 -= 1;
      print ('urb');
      eten = 7;
      etenTijd = 0.5;
      energieoplaad = 0.35;
      energieoplaadtijd = 10;
      xp += 30;
    }

      //groot voedsel
     if (Knop(315, 425, 350, 410) && voedselplus1 > 0){ //voedselplus1 broodje vlees
      //brood + vlees 5 = 10 broodjes vlees
      voedselplus1 -= 1;
      print ('BREUT');
      eten = 1.5;
      etenTijd = 1.5;
      energieoplaad = 1.3;
      energieoplaadtijd = 1.5;
      xp += 10;
    }

     if (Knop(445, 555, 350, 410) && voedselplus2 > 0){ //voedselplus2 pizza
      //brood 2 + blad sla 5 + kaasstuk = pizza
      voedselplus2 -= 1;
      print ('pizza!');
      eten = 2,5;
      etenTijd = 10;
      energieoplaad = 0.6;
      energieoplaadtijd = 25;
      xp += 250;
    }

     if (Knop(575, 685, 350, 410) && voedselplus3 > 0){ //voedselplus3 BOM
      //buskruit 25 = BOM
      voedselplus3 -= 1;
      print ('BAM!');
      opHolGeslagenEnergie = true;
      bAM = true;
      teVeelEnergie = 255
      menu = 0;
      doodmanier = 3;
    }
  }
  //menu 2 spelen
  if (menu == 2){
    if (Knop(390, 450, 430, 490)){ 
      if (spelen == false){
        spelen = true;
        badderen = false;
        douchen = false;
      }
      else{
        spelen = false;
      }
    }

    if (Knop(470, 530, 430, 490)){ 
    
    }
  }

  //menu 3 genees en schoonmaken
  if (menu == 3){
    if (Knop(550, 610 , 430, 490) && medicijnen > 0 && genezentijd == 0 && douchen == false){
      medicijnen -= 1;
      genezen = 2.5;
      genezentijd = 2;
      xp += 150;
    }

    if (Knop(390, 450, 430, 490)){
      if (douchen == false && water >= 100){
        douchen = true;
        spelen = false;
       // print ('aan')
      }
      else {
        douchen = false;
        
       // print ('uit')
      }
    }
    if (Knop(470, 530, 430, 490)){
      if (badderen == false && water >= 250 && honger <= 200){
        badderen = true;
        spelen = false;
      }
      else{
        badderen = false
      }
    }
  }
  //menu 4
  if (menu == 4){
    if (Knop(205, 245, 370, 390)){kubusR -=100} //rood
    if (Knop(245, 285, 370, 390)){kubusR -=10}
    if (Knop(285, 325, 370, 390)){kubusR -=1}
    if (Knop(325, 365, 370, 390)){kubusR +=1}
    if (Knop(365, 405, 370, 390)){kubusR +=10}
    if (Knop(405, 445, 370, 390)){kubusR +=100}
    if (Knop(205, 445, 370, 390)){ //Limiet
      if (kubusR < 0){kubusR =0}
      if (kubusR > 255){kubusR =255}
    }

    if (Knop(205, 245, 410, 430)){kubusG -=100} //groen
    if (Knop(245, 285, 410, 430)){kubusG -=10}
    if (Knop(285, 325, 410, 430)){kubusG -=1}
    if (Knop(325, 365, 410, 430)){kubusG +=1}
    if (Knop(365, 405, 410, 430)){kubusG +=10}
    if (Knop(405, 445, 410, 430)){kubusG +=100}

    if (Knop(205, 445, 410, 430)){ //Limiet
      if (kubusG < 0){kubusG =0}
      if (kubusG > 255){kubusG =255}
    }
    
    if (Knop(205, 245, 450, 470)){kubusB -=100} //blauw
    if (Knop(245, 285, 450, 470)){kubusB -=10}
    if (Knop(285, 325, 450, 470)){kubusB -=1}
    if (Knop(325, 365, 450, 470)){kubusB +=1}
    if (Knop(365, 405, 450, 470)){kubusB +=10}
    if (Knop(405, 445, 450, 470)){kubusB +=100}

    if (Knop(205, 445, 450, 470)){ //Limiet
      if (kubusB < 0){kubusB =0}
      if (kubusB > 255){kubusB =255}
    }
  }

//menu 5 winkel
  if (menu == 5){
    if (Knop(315, 425, 410, 490)){
      if (winkelMenu != 1){
        winkelMenu = 1;
      }
      else {
        winkelMenu = 0;
      }
    }
    if (Knop(445, 555, 410, 490)){
      if (winkelMenu != 2){
        winkelMenu = 2;
      }
      else {
        winkelMenu = 0;
      }
    }
    if (Knop(575, 685, 410, 490)){
      if (winkelMenu != 3){
        winkelMenu = 3;
      }
      else {
        winkelMenu = 0;
      }
    }

    //Winkelmenu 1 eten
    if (winkelMenu == 1){ //blad sla
      if (Knop (360, 640, 30, 90) && geld >= 5){
        voedsel1 += 1;
        geld -= 5;
      }
    
     //vlees
      if (Knop (360, 640, 110, 170) && geld >= 25){
        voedsel2 += 1;
        geld -= 25;
      
    }
      //brood
      if (Knop (360, 640, 190, 250) && geld >= 300){
        voedsel3 += 1;
        geld -= 300;
      
    }
    //buskruit
      if (Knop (360, 640, 270, 330) && geld >= 800){
        voedsel4 += 1;
        geld -= 800;
      
    }
     //kaasstuk
      if (Knop (360, 640, 350, 410) && geld >= 400){
        voedsel5 += 1;
        geld -= 400;
      }
    }
      //winkelmenu 2 eten maken
    if (winkelMenu == 2){
         //broodje vlees
      if (Knop (360, 640, 190, 250) && voedsel2 >= 5 && voedsel3 >= 1){
        voedsel2 -= 5;
        voedsel3 -= 1;
        voedselplus1 += 10;
      
    }
    //pizza
      if (Knop (360, 640, 270, 330) && voedsel1 >= 5 && voedsel3 >= 2 && voedsel5 >= 1){
        voedsel1 -= 5;
        voedsel3 -= 2;
        voedsel5 -= 1;
        voedselplus2 += 1;
      
    }
     //BOM
      if (Knop (360, 640, 390, 450) && voedsel4 >= 25){
        voedsel4 -= 25;
        voedselplus3 += 1;
      }
    }
    //winkelmenu 3 water en medicijnen
    if (winkelMenu == 3){
      //water/geld 2/1
      if (Knop (360, 640, 110, 170) && geld >= 25){ 
        water += 50;
        geld -= 25;
      
    }
      //water/geld 3/1
      if (Knop (360, 640, 190, 250) && geld >= 100){ 
        water += 300;
        geld -= 100;
      
    }
      //water/geld 4/1
      if (Knop (360, 640, 270, 330) && geld >= 250){ 
        water += 1000;
        geld -= 250;
      
    }
     //medicijnen
      if (Knop (360, 640, 350, 410) && geld >= 400){
        medicijnen += 1;
        geld -= 1200;
      }
    }
  }

  //Save load menu
  if (saveloadmenu == 1){
    if (Knop(360, 480, 325, 375)){
     Save();
    }
    if (Knop(520, 640, 325, 375)){
     Load();
    }
  }

  //RESETVRAAG
  if (resetvraag == true){
    if (Knop(290, 400, 340, 400)){
      TotalReset();
    }
     if (Knop(590, 700, 340, 400)){
      resetvraag = false;
    }
  }
 
}

function Knop(minX, maxX, minY, maxY) {
  if (mouseX > minX && mouseX <= maxX && mouseY > minY && mouseY <= maxY) {
    return (true);
  }
  else {
    return (false);
  }
}


function TotalReset(){ //reset alles naar basisstats
 geld = 10 //geld en stuff
 geldtijd = 60
 level = 1
 xp = 0
 xptijd = 0

 voedsel1 = 5
 voedsel2 = 1
 voedsel3 = 0
 voedsel4 = 0
 voedsel5 = 0

 voedselplus1 = 0
 voedselplus2 = 0
 voedselplus3 = 0

 water = 100
 medicijnen = 0

//stats
 honger = 80
 hongerSnelheid = -1

 energie = 80
 energieSnelheid = -0.2

 geluk = 80
 gelukSnelheid = -1

 gezond = 80
 gezondSnelheid = -1

  eten = 0
 etenTijd = 0

 energieoplaad = 0
 energieoplaadtijd = 0

 spelen = false;
 minigame = 0;

 genezen = 0
 genezentijd = 0

 douchen = false
 badderen = false
 medicijn = 0
 medicijntijd = 0

 dood = false
 preDoodmanier = 0
 doodmanier = 0
 slapen = false
 menu = 0
 winkelMenu = 0

//doodmanieren te veel van iets
 opHolGeslagenGroei = false
 groeiImplosie = false
 groeiFase = 0;
 zwarteGat = false;

 opHolGeslagenEnergie = false
 teVeelEnergie = 0
 energieBoemfase = 0
 energieBoem = 0 //grootte
 energieBoem2 = 0  //transparantie
 geExplodeerd = false

 bAM = false

 saveloadmenu = 0
 resetvraag = false

//doodmanieren 
 resetvraag = false

//doodmanieren te weinig van iets
 
}

function Save(){ //localStorage.setItem ('item', waarde); = save
  //geld en xp
    localStorage.setItem('geld', geld);
    localStorage.setItem('level', level);
    localStorage.setItem('xp', xp);
  //voedsel
    localStorage.setItem('voedsel1', voedsel1);
    localStorage.setItem('voedsel2', voedsel2);
    localStorage.setItem('voedsel3', voedsel3);
    localStorage.setItem('voedsel4', voedsel4);
    localStorage.setItem('voedsel5', voedsel5);

    localStorage.setItem('voedselplus1', voedselplus1);
    localStorage.setItem('voedselplus2', voedselplus2);
    localStorage.setItem('voedselplus3', voedselplus3);
  //water en medicijnen
    localStorage.setItem('water', water);
    localStorage.setItem('medicijnen', medicijnen);
  //stats
    localStorage.setItem('honger', honger);
    localStorage.setItem('energie', energie);
    localStorage.setItem('geluk', geluk);
    localStorage.setItem('gezond', gezond);
  //kleur
    localStorage.setItem('kubusR', kubusR);
    localStorage.setItem('kubusG', kubusG);
    localStorage.setItem('kubusB', kubusB);

}

function Load(){ //waarde = parseInt(localStorage.getItem('item')); = load
    //geld en xp
    geld = parseInt(localStorage.getItem('geld'));
    if (geld == null){ geld = 10}
    level = parseInt(localStorage.getItem('level'));
    if (level == null){ level = 1}
    xp = parseInt(localStorage.getItem('xp'));
    if (xp == null){ xp = 0}
    //voedsel
    voedsel1 = parseInt(localStorage.getItem('voedsel1'));
    if (voedsel1 == null){voedsel1 = 0;}
    voedsel2 = parseInt(localStorage.getItem('voedsel2'));
    if (voedsel2 == null){voedsel2 = 0;}
    voedsel3 = parseInt(localStorage.getItem('voedsel3'));
    if (voedsel3 == null){voedsel3 = 0;}
    voedsel4 = parseInt(localStorage.getItem('voedsel4'));
    if (voedsel4 == null){voedsel4 = 0;}
    voedsel5 = parseInt(localStorage.getItem('voedsel5'));
    if (voedsel5 == null){voedsel5 = 0;}

    voedselplus1 = parseInt(localStorage.getItem('voedselplus1'));
    if (voedselplus1 == null){voedselplus1 = 0;}
    voedselplus2 = parseInt(localStorage.getItem('voedselplus2'));
    if (voedselplus2 == null){voedselplus2 = 0;}
    voedselplus3 = parseInt(localStorage.getItem('voedselplus3'));
    if (voedselplus3 == null){voedselplus3 = 0;}
    //water en medicijnen
    water = parseInt(localStorage.getItem('water'));
    if (water == null){water = 0;}
    medicijnen = parseInt(localStorage.getItem('medicijnen'));
    if (medicijnen == null){medicijnen = 0;}
    //stats
    honger = parseInt(localStorage.getItem('honger'));
    if (honger == null){honger = 10;}
    energie = parseInt(localStorage.getItem('energie'));
    if (energie == null){energie = 10;}
    geluk = parseInt(localStorage.getItem('geluk'));
    if (geluk == null){geluk = 10;}
    gezond = parseInt(localStorage.getItem('gezond'));
    if (gezond == null){gezond = 10;}
    //kleur
    kubusR = parseInt(localStorage.getItem('kubusR'));
    if (kubusR == null){kubusR = 100;}
    kubusG = parseInt(localStorage.getItem('kubusG'));
    if (kubusG == null){kubusG = 100;}
    kubusB = parseInt(localStorage.getItem('kubusB'));
    if (kubusB == null){kubusB = 100;}

    badderen = false;
    menu = 0;
    winkelMenu = 0;
}

function Imagetest(){

}

function Muislocatie(){
  fill (0);
  stroke (0);
  textSize(40);
  strokeWeight(5);
  line(mouseX, 0, mouseX, 3000);
  line(0, mouseY,  3000, mouseY, );
  strokeWeight (0);
  text("x: " + mouseX + "y:" + mouseY, 20, 40)
}