var hidden = true;
var opened = false;
var fulltext = "Tylko jedno w głowie mam Koksu pięc gram Odlecieć sam W krainę zapomnienia W głowie mysli mam Kiedy skończy się ten stan Gdy już nie będę sam Bo wjedzie biały węgorz Tylko jedno w głowie mam Koksu pięc gram Odlecieć sam W krainę zapomnienia W głowie mysli mam Kiedy skończy się ten stan Gdy już nie będę sam Bo wjedzie biały węgorz Ja pierdolę, ale mam zjazd Nie chwytam gwiazd, jak kłoda leżę Nie wierzę Co się dzieje Jak kura z głodu pieję Jak wilkołak do księżyca W głowie dziury jak ulica Przed twoją chatą Rozpuszczam się jak baton Który leży na blacie Zejście jest jak nie wciągacie Bracie kurwa ryj mi krzywi W głowie burdеl jak w TV Mnie nie dziwi taki stan Brak towaru, w myślach ćpam Rade dam albo niе dam Wszystko kurwa z chaty sprzedam W sumie mam już przejebane Wszystko jednak jest sprzedane Ja pierdolę, same długi Kinol jak u Tabalugi Dzień drugi bez walenia Gdzie jest wąż? Biała chemia Jebane zejście tak wykańcza Jak by w chuja dziabła cię szarańcza Tylko jedno w głowie mam Koksu pięc gram Odlecieć sam W krainę zapomnienia W głowie mysli mam Kiedy skończy się ten stan Gdy już nie będę sam Bo wjedzie biały węgorz Chemia party, chcę na narty Do dilera, a nie w Alpy O żesz kurwa, chyba fiknę Jak w nochala nic nie psiknę Tak bardzo chce dotykać gwiazd Ale nic z tego, bo mam zjazd Totalne kurwa mega zejście A marzy mi się smoka wejście Masz hajsy? Ci też zalegam? No to chuj, dziś już nie biegam Chcę mieć kopa jak pantera W krechę nie ma u dilera Już nie, na pewno nie Chyba śmierć rozkłada mnie Nic nie przełknę, mam dreszcze Kurwa mać, ile jeszcze Będzie trwał ten stan? Śnił mi się koksu van I hery gram tak dla smaku Chcę się wozić w Cadillacu Myślami po znajomych biegam Lecz każdemu coś zalegam Odpada opcja pożyczki Bo przycinam jak nożyczki Tylko jedno w głowie mam Koksu pięc gram Odlecieć sam W krainę zapomnienia W głowie mysli mam Kiedy skończy się ten stan Gdy już nie będę sam Bo wjedzie biały węgorz Syf jak na Discovery Chcę wystrzelić jak z giwery Chcę hery i inne bajery W nosie pustka, słychać szmery Macie numer do Gargamela? Może u niego w kotle jest hera? Wiem - głupoty pierdolę Ale nie ma nic na stole A w kieszeni jebana pustka Przydała by się w totka szóstka Albo chociaż jakaś czwórka I bym leciał jak jaskółka Jak pszczółka Maja Do ucha śpiewałaby mi Kayah To są jaja, no nie wierzę Wygięty leżę jak zdechłe zwierze Gorączka w kurwę się nasila Poharatany jak dupa fakira Jak zdzira wymiętolony Leżę kurwa rozpalony Hej Johnny, chciałbym posypać I na łące jak królik brykać Ale cały czas ten zjazd Usycham jak wyrwany chwast Tylko jedno w głowie mam Koksu pięc gram Odlecieć sam W krainę zapomnienia W głowie mysli mam Kiedy skończy się ten stan Gdy już nie będę sam Bo wjedzie biały węgorz";

if (Math.random() <= 0.05) hidden = false;
if (Math.random() <= 0.001) hidden = false;
if (Math.random() <= 0.0001) hidden = false;
if (firstboot) hidden = false;

apps.polishcow = {
  "name": "Polish Cow",
  "icon": "polishcow.gif",
  "exec": polishcow,
  "hide": hidden
}

function polishcow() {
  if (opened) return;
  opened = true;

  for (i = 0; i <= 20; i++) popup("https://c.tenor.com/j6HNDMU_fF4AAAAM/cow-dancing.gif", "Tylko jedno w głowie mam Koksu pięc gram", "Odlecieć sam W krainę zapomnienia W głowie mysli mam Kiedy skończy się ten stan Gdy już nie będę sam Bo wjedzie biały węgorz");

  for (h in apps) {
    if (h !== "polishcow") {
      apps[h].exec=function(){onerror(fulltext);};
      apps[h].iconURI="https://c.tenor.com/j6HNDMU_fF4AAAAM/cow-dancing.gif";
      delete apps[h].icon;
    }
  };showdesktop();

  let allimgs = document.querySelectorAll("img");
  for (i = 0; i < allimgs.length; i++) allimgs[i].src = "https://c.tenor.com/j6HNDMU_fF4AAAAM/cow-dancing.gif";

  setInterval(() => {
    let id = win({ title: "polish cow", inner: (fulltext.repeat(10)), closable: false, maximizable: false, minimizable: false, width: 500, height: 500 });
    win.instances[id]
  }, 500)

  var cow = new Audio("https://www.myinstants.com/media/sounds/y2mate_q2ZbcVp.mp3");
  cow.loop = true;
  cow.play();
}