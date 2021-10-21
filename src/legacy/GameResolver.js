const lines = [
  '# id | pretty name for readme | protocol | options | extra\r',
  '\r',
  '7d2d|7 Days to Die (2013)|valve|port=26900,port_query_offset=1\r',
  'ageofchivalry|Age of Chivalry (2007)|valve|port=27015\r',
  'aoe2|Age of Empires 2 (1999)|ase|port_query=27224\r',
  'alienarena|Alien Arena (2004)|quake2|port_query=27910\r',
  'alienswarm|Alien Swarm (2010)|valve|port=27015\r',
  'arkse|Ark: Survival Evolved (2017)|valve|port=7777,port_query=27015\r',
  'assettocorsa|Assetto Corsa (2014)|assettocorsa|port=9610\r',
  'atlas|Atlas (2018)|valve|port=5761,port_query_offset=51800\r',
  'avp2|Aliens versus Predator 2 (2001)|gamespy1|port=27888\r',
  'avp2010|Aliens vs. Predator (2010)|valve|port=27015\r',
  '\r',
  "americasarmy|America's Army (2002)|gamespy2|port=1716,port_query_offset=1\r",
  "americasarmy2|America's Army 2 (2003)|gamespy2|port=1716,port_query_offset=1\r",
  "americasarmy3|America's Army 3 (2009)|valve|port=8777,port_query=27020\r",
  "americasarmypg|America's Army: Proving Grounds (2015)|valve|port=8777,port_query=27020\r",
  '\r',
  'arcasimracing|Arca Sim Racing (2008)|rfactor|port=34397,port_query_offset=-100\r',
  '\r',
  'arma|ARMA: Armed Assault (2007)|gamespy2|port=2302\r',
  'arma2|ARMA 2 (2009)|valve|port=2302,port_query_offset=1\r',
  'arma2oa|ARMA 2: Operation Arrowhead (2010)|valve|port=2302,port_query_offset=1\r',
  'armacwa|ARMA: Cold War Assault (2011)|gamespy1|port=2302,port_query_offset=1\r',
  'armar|ARMA: Resistance (2011)|gamespy1|port=2302,port_query_offset=1\r',
  'arma3|ARMA 3 (2013)|valve|port=2302,port_query_offset=1\r',
  '\r',
  'armagetron|Armagetron Advanced (2001)|armagetron|port=4534\r',
  "baldursgate|Baldur's Gate (1998)|gamespy1|port=6073,port_query=1470\r",
  'bat1944|Battalion 1944 (2018)|valve|port=7777,port_query_offset=3\r',
  '\r',
  'bf1942|Battlefield 1942 (2002)|gamespy1|port=14567,port_query=23000\r',
  'bfv|Battlefield Vietnam (2004)|gamespy2|port=15567,port_query=23000\r',
  'bf2|Battlefield 2 (2005)|gamespy3|port=16567,port_query=29900\r',
  'bf2142|Battlefield 2142 (2006)|gamespy3|port=16567,port_query=29900\r',
  'bfbc2|Battlefield: Bad Company 2 (2010)|battlefield|port=19567,port_query=48888\r',
  'bf3|Battlefield 3 (2011)|battlefield|port=25200,port_query_offset=22000\r',
  'bf4|Battlefield 4 (2013)|battlefield|port=25200,port_query_offset=22000\r',
  'bfh|Battlefield Hardline (2015)|battlefield|port=25200,port_query_offset=22000\r',
  '\r',
  'breach|Breach (2011)|valve|port=27016\r',
  'breed|Breed (2004)|gamespy2|port=7649\r',
  'brink|Brink (2011)|valve|port_query_offset=1\r',
  'buildandshoot|Build and Shoot / Ace of Spades Classic (2012)|buildandshoot|port=32887,port_query_offset=-1\r',
  '\r',
  'cod|Call of Duty (2003)|quake3|port=28960\r',
  'coduo|Call of Duty: United Offensive (2004)|quake3|port=28960\r',
  'cod2|Call of Duty 2 (2005)|quake3|port=28960\r',
  'cod3|Call of Duty 3 (2006)|quake3|port=28960\r',
  'cod4|Call of Duty 4: Modern Warfare (2007)|quake3|port=28960\r',
  'codwaw|Call of Duty: World at War (2008)|quake3|port=28960\r',
  'codmw2|Call of Duty: Modern Warfare 2 (2009)|quake3|port=28960\r',
  'codmw3|Call of Duty: Modern Warfare 3 (2011)|valve|port_query_offset=2\r',
  '\r',
  'callofjuarez|Call of Juarez (2006)|ase|port_query=26000\r',
  'chaser|Chaser (2003)|ase|port=3000,port_query_offset=123\r',
  'chrome|Chrome (2003)|ase|port=27015,port_query_offset=123\r',
  'codenameeagle|Codename Eagle (2000)|gamespy1|port_query=4711\r',
  'commandos3|Commandos 3: Destination Berlin (2003)|gamespy1|port_query=6500\r',
  'cacrenegade|Command and Conquer: Renegade (2002)|gamespy1|port=4848,port_query=25300\r',
  'conanexiles|Conan Exiles (2018)|valve|port=7777,port_query=27015\r',
  'contagion|Contagion (2011)|valve|port=27015\r',
  'contactjack|Contract J.A.C.K. (2003)|gamespy1|port_query=27888\r',
  '\r',
  'cs15|Counter-Strike 1.5 (2002)|valve|port=27015\r',
  'cs16|Counter-Strike 1.6 (2003)|valve|port=27015\r',
  'cs2d|Counter-Strike: 2D (2004)|cs2d|port=36963\r',
  'cscz|Counter-Strike: Condition Zero (2004)|valve|port=27015\r',
  'css|Counter-Strike: Source (2004)|valve|port=27015\r',
  'csgo|Counter-Strike: Global Offensive (2012)|valve|port=27015|doc_notes=csgo\r',
  '\r',
  'crossracing|Cross Racing Championship Extreme 2005 (2005)|ase|port=12321,port_query_offset=123\r',
  '\r',
  'crysis|Crysis (2007)|gamespy3|port=64087\r',
  'crysiswars|Crysis Wars (2008)|gamespy3|port=64100\r',
  'crysis2|Crysis 2 (2011)|gamespy3|port=64000\r',
  '\r',
  'daikatana|Daikatana (2000)|quake2|port=27982,port_query_offset=10\r',
  'dmomam|Dark Messiah of Might and Magic (2006)|valve|port=27015\r',
  "darkesthour|Darkest Hour: Europe '44-'45 (2008)|unreal2|port=7757,port_query_offset=1\r",
  'daysofwar|Days of War (2017)|valve|port=27015\r',
  'dayz|DayZ (2018)|valve|port=2302,port_query_offset=24714\r',
  'dayzmod|DayZ Mod (2013)|valve|port=2302,port_query_offset=1\r',
  'deadlydozenpt|Deadly Dozen: Pacific Theater (2002)|gamespy1|port_query=25300\r',
  'dh2005|Deer Hunter 2005 (2004)|gamespy2|port=23459,port_query=34567\r',
  'descent3|Descent 3 (1999)|gamespy1|port=2092,port_query=20142\r',
  'deusex|Deus Ex (2000)|gamespy2|port=7791,port_query_offset=1\r',
  'devastation|Devastation (2003)|unreal2|port=7777,port_query_offset=1\r',
  'dinodday|Dino D-Day (2011)|valve|port=27015\r',
  'dirttrackracing2|Dirt Track Racing 2 (2002)|gamespy1|port=32240,port_query_offset=-100\r',
  'discord|Discord|discord||doc_notes=discord\r',
  'dnl|Dark and Light (2017)|valve|port=7777,port_query=27015\r',
  'dod|Day of Defeat (2003)|valve|port=27015\r',
  'dods|Day of Defeat: Source (2005)|valve|port=27015\r',
  'doi|Day of Infamy (2017)|valve|port=27015\r',
  'doom3|Doom 3 (2004)|doom3|port=27666\r',
  'dota2|Dota 2 (2013)|valve|port=27015\r',
  'drakan|Drakan: Order of the Flame (1999)|gamespy1|port=27045,port_query_offset=1\r',
  'empyrion|Empyrion - Galactic Survival (2015)|valve|port=30000,port_query_offset=1\r',
  'etqw|Enemy Territory: Quake Wars (2007)|doom3|port=3074,port_query=27733\r',
  'fear|F.E.A.R. (2005)|gamespy2|port_query=27888\r',
  'f12002|Formula One 2002 (2002)|gamespy1|port_query=3297\r',
  "f1c9902|F1 Challenge '99-'02 (2002)|gamespy1|port_query=34397\r",
  'farcry|Far Cry (2004)|ase|port=49001,port_query_offset=123\r',
  'farcry2|Far Cry 2 (2008)|ase|port_query=14001\r',
  'fortressforever|Fortress Forever (2007)|valve|port=27015\r',
  'operationflashpoint,flashpoint|Operation Flashpoint: Cold War Crisis (2001)|gamespy1|port=2302,port_query_offset=1\r',
  'flashpointresistance|Operation Flashpoint: Resistance (2002)|gamespy1|port=2302,port_query_offset=1\r',
  'ffow|Frontlines: Fuel of War (2008)|ffow|port=5476,port_query_offset=2\r',
  'fivem|Grand Theft Auto V - FiveM (2013)|fivem|port=30120\r',
  'forrest|The Forrest (2014)|valve|port=27015,port_query_offset=1\r',
  "garrysmod|Garry's Mod (2004)|valve|port=27015\r",
  "graw|Tom Clancy's Ghost Recon Advanced Warfighter (2006)|gamespy2|port_query=15250\r",
  "graw2|Tom Clancy's Ghost Recon Advanced Warfighter 2 (2007)|gamespy2|port_query=16250\r",
  'giantscitizenkabuto|Giants: Citizen Kabuto (2000)|gamespy1|port_query=8911\r',
  'globaloperations|Global Operations (2002)|gamespy1|port_query=28672\r',
  'geneshift,mutantfactions|Geneshift (2017)|geneshift|port=11235\r',
  'ges|GoldenEye: Source (2010)|valve|port=27015\r',
  'gore|Gore: Ultimate Soldier (2002)|gamespy1|port=27777,port_query_offset=1\r',
  'gunmanchronicles|Gunman Chronicles (2000)|valve|port=27015\r',
  'hldm|Half-Life Deathmatch (1998)|valve|port=27015\r',
  'hldms|Half-Life Deathmatch: Source (2005)|valve|port=27015\r',
  'hl2dm|Half-Life 2: Deathmatch (2004)|valve|port=27015\r',
  'halo|Halo (2003)|gamespy2|port=2302\r',
  'halo2|Halo 2 (2007)|gamespy2|port=2302\r',
  'heretic2|Heretic II (1998)|gamespy1|port=27900,port_query_offset=1\r',
  'hexen2|Hexen II (1997)|hexen2|port=26900,port_query_offset=50\r',
  'hidden|The Hidden (2005)|valve|port=27015\r',
  'hll|Hell Let Loose|valve|port=27015\r',
  'had2|Hidden & Dangerous 2 (2003)|gamespy1|port=11001,port_query_offset=3\r',
  'homefront|Homefront (2011)|valve|port=27015\r',
  'homeworld2|Homeworld 2 (2003)|gamespy1|port_query=6500\r',
  'hurtworld|Hurtworld (2015)|valve|port=12871,port_query=12881\r',
  'igi2|I.G.I.-2: Covert Strike (2003)|gamespy1|port_query=26001\r',
  'il2|IL-2 Sturmovik (2001)|gamespy1|port_query=21000\r',
  'insurgency|Insurgency (2014)|valve|port=27015\r',
  'insurgencysandstorm|Insurgency: Sandstorm (2018)|valve|port=27015,port_query_offset=1\r',
  'ironstorm|Iron Storm (2002)|gamespy1|port_query=3505\r',
  'jamesbondnightfire|James Bond 007: Nightfire (2002)|gamespy1|port_query=6550\r',
  'jc2mp|Just Cause 2 - Multiplayer (2010)|jc2mp|port=7777\r',
  'jc3mp|Just Cause 3 - Multiplayer (2017)|valve|port=4200,port_query_offset=1\r',
  'killingfloor|Killing Floor (2009)|unreal2|port=7707,port_query_offset=1\r',
  'killingfloor2|Killing Floor 2 (2016)|valve|port=7777,port_query=27015\r',
  'kingpin|Kingpin: Life of Crime (1999)|gamespy1|port=31510,port_query_offset=-10\r',
  'kisspc|Kiss: Psycho Circus: The Nightmare Child (2000)|gamespy1|port=7777,port_query_offset=1\r',
  'kspdmp|Kerbal Space Program - DMP Multiplayer (2015)|kspdmp|port=6702,port_query_offset=1\r',
  'kzmod|Kreedz Climbing (2017)|valve|port=27015\r',
  'left4dead|Left 4 Dead (2008)|valve|port=27015\r',
  'left4dead2|Left 4 Dead 2 (2009)|valve|port=27015\r',
  'm2mp|Mafia II - Multiplayer (2010)|mafia2mp|port=27016,port_query_offset=1\r',
  'm2o|Mafia II - Online (2010)|mafia2online|port=27015,port_query_offset=1\r',
  'medievalengineers|Medieval Engineers (2015)|valve|port=27015\r',
  '\r',
  'mohaa|Medal of Honor: Allied Assault (2002)|gamespy1|port=12203,port_query_offset=97\r',
  'mohsh|Medal of Honor: Allied Assault Spearhead (2002)|gamespy1|port=12203,port_query_offset=97\r',
  'mohbt|Medal of Honor: Allied Assault Breakthrough (2003)|gamespy1|port=12203,port_query_offset=97\r',
  'mohpa|Medal of Honor: Pacific Assault (2004)|gamespy1|port=13203,port_query_offset=97\r',
  'mohab|Medal of Honor: Airborne (2007)|gamespy1|port=12203,port_query_offset=97\r',
  'moh2010|Medal of Honor (2010)|battlefield|port=7673,port_query=48888\r',
  'mohwf|Medal of Honor: Warfighter (2012)|battlefield|port=25200,port_query_offset=22000\r',
  '\r',
  'minecraft,minecraftping|Minecraft (2009)|minecraft|port=25565\r',
  'minecraftpe,minecraftbe|Minecraft: Bedrock Edition (2011)|minecraft|port=19132\r',
  '\r',
  'mnc|Monday Night Combat (2011)|valve|port=7777,port_query=27016\r',
  'mordhau|Mordhau (2019)|valve|port=7777,port_query=27015\r',
  'mtavc|Grand Theft Auto: Vice City - Multi Theft Auto (2002)|ase|port=22003,port_query_offset=123\r',
  'mtasa|Grand Theft Auto: San Andreas - Multi Theft Auto (2004)|ase|port=22003,port_query_offset=123\r',
  'mumble|Mumble - GTmurmur Plugin (2005)|mumble|port=64738,port_query=27800|doc_notes=mumble\r',
  'mumbleping|Mumble - Lightweight (2005)|mumbleping|port=64738|doc_notes=mumble\r',
  'nascarthunder2004|NASCAR Thunder 2004 (2003)|gamespy2|port_query=13333\r',
  'netpanzer|netPanzer (2002)|gamespy1|port=3030\r',
  'nmrih|No More Room in Hell (2011)|valve|port=27015\r',
  'ns|Natural Selection (2002)|valve|port=27015\r',
  'ns2|Natural Selection 2 (2012)|valve|port_query_offset=1\r',
  'nfshp2|Need for Speed: Hot Pursuit 2 (2002)|gamespy1|port_query=61220\r',
  'nab|Nerf Arena Blast (1999)|gamespy1|port=4444,port_query_offset=1\r',
  'nwn|Neverwinter Nights (2002)|gamespy2|port_query=5121\r',
  'nwn2|Neverwinter Nights 2 (2006)|gamespy2|port=5121,port_query=6500\r',
  'nexuiz|Nexuiz (2005)|quake3|port_query=26000\r',
  'nitrofamily|Nitro Family (2004)|gamespy1|port_query=25601\r',
  'nolf|The Operative: No One Lives Forever (2000)|gamespy1|port_query=27888\r',
  "nolf2|No One Lives Forever 2: A Spy in H.A.R.M.'s Way (2002)|gamespy1|port_query=27890\r",
  'nucleardawn|Nuclear Dawn (2011)|valve|port=27015\r',
  'openarena|OpenArena (2005)|quake3|port_query=27960\r',
  'openttd|OpenTTD (2004)|openttd|port=3979\r',
  'painkiller|Painkiller|ase|port=3455,port_query_offset=123\r',
  'pixark|PixARK (2018)|valve|port=7777,port_query=27015\r',
  'postal2|Postal 2|gamespy1|port=7777,port_query_offset=1\r',
  'prey|Prey|doom3|port=27719\r',
  'primalcarnage|Primal Carnage: Extinction|valve|port=7777,port_query=27015\r',
  'prbf2|Project Reality: Battlefield 2 (2005)|gamespy3|port=16567,port_query=29900\r',
  '\r',
  'quake1|Quake 1: QuakeWorld (1996)|quake1|port=27500\r',
  'quake2|Quake 2 (1997)|quake2|port=27910\r',
  'quake3|Quake 3: Arena (1999)|quake3|port=27960\r',
  'quake4|Quake 4 (2005)|doom3|port=28004\r',
  'quakelive|Quake Live (2010)|valve|port=27960\r',
  '\r',
  'ragdollkungfu|Rag Doll Kung Fu|valve|port=27015\r',
  '\r',
  'r6|Rainbow Six|gamespy1|port_query=2348\r',
  'r6roguespear|Rainbow Six 2: Rogue Spear|gamespy1|port_query=2346\r',
  'r6ravenshield|Rainbow Six 3: Raven Shield|gamespy1|port=7777,port_query_offset=1000\r',
  '\r',
  'rallisportchallenge|RalliSport Challenge|gamespy1|port_query=17500\r',
  'rallymasters|Rally Masters|gamespy1|port_query=16666\r',
  'redorchestra|Red Orchestra|unreal2|port=7758,port_query_offset=1\r',
  'redorchestraost|Red Orchestra: Ostfront 41-45|gamespy1|port=7757,port_query_offset=10\r',
  'redorchestra2|Red Orchestra 2|valve|port=7777,port_query=27015\r',
  'redline|Redline|gamespy1|port_query=25252\r',
  'rtcw|Return to Castle Wolfenstein|quake3|port_query=27960\r',
  'rfactor|rFactor|rfactor|port=34397,port_query_offset=-100\r',
  'ricochet|Ricochet|valve|port=27015\r',
  'riseofnations|Rise of Nations|gamespy1|port_query=6501\r',
  'rs2|Rising Storm 2: Vietnam|valve|port=27015\r',
  'rune|Rune|gamespy1|port=7777,port_query_offset=1\r',
  'rust|Rust|valve|port=28015\r',
  'samp|San Andreas Multiplayer|samp|port=7777\r',
  'savage2|Savage 2: A Tortured Soul (2008)|savage2|port_query=11235\r',
  'spaceengineers|Space Engineers|valve|port=27015\r',
  'ss|Serious Sam|gamespy1|port=25600,port_query_offset=1\r',
  'ss2|Serious Sam 2|gamespy2|port=25600\r',
  'shatteredhorizon|Shattered Horizon|valve|port=27015\r',
  'ship|The Ship|valve|port=27015\r',
  'shogo|Shogo|gamespy1|port_query=27888\r',
  'shootmania|Shootmania|nadeo|port=2350,port_query=5000|doc_notes=nadeo-shootmania--trackmania--etc\r',
  'sin|SiN|gamespy1|port_query=22450\r',
  'sinep|SiN Episodes|valve|port=27015\r',
  'soldat|Soldat|ase|port=13073,port_query_offset=123\r',
  'sof|Soldier of Fortune|quake1|port_query=28910\r',
  'sof2|Soldier of Fortune 2|quake3|port_query=20100\r',
  'stalker|S.T.A.L.K.E.R.|gamespy3|port=5445,port_query_offset=2\r',
  '\r',
  'stbc|Star Trek: Bridge Commander|gamespy1|port_query=22101\r',
  'stvef|Star Trek: Voyager - Elite Force|quake3|port_query=27960\r',
  'stvef2|Star Trek: Voyager - Elite Force 2|quake3|port_query=29253\r',
  'squad|Squad|valve|port=7787,port_query=27165\r',
  'swbf|Star Wars: Battlefront|gamespy2|port_query=3658\r',
  'swbf2|Star Wars: Battlefront 2|gamespy2|port_query=3658\r',
  'swjk|Star Wars Jedi Knight: Jedi Academy (2003)|quake3|port_query=29070\r',
  'swjk2|Star Wars Jedi Knight II: Jedi Outcast (2002)|quake3|port_query=28070\r',
  'swrc|Star Wars: Republic Commando|gamespy2|port=7777,port_query=11138\r',
  '\r',
  'starbound|Starbound|valve|port=21025\r',
  'starmade|StarMade|starmade|port=4242\r',
  'starsiege|Starsiege (2009)|starsiege|port=29001\r',
  'suicidesurvival|Suicide Survival|valve|port=27015\r',
  'swat4|SWAT 4|gamespy2|port=10480,port_query_offset=2\r',
  'svencoop|Sven Coop|valve|port=27015\r',
  'synergy|Synergy|valve|port=27015\r',
  'tacticalops|Tactical Ops|gamespy1|port=7777,port_query_offset=1\r',
  'takeonhelicopters|Take On Helicopters (2011)|gamespy1|port=2302,port_query_offset=1\r',
  'teamfactor|Team Factor|gamespy1|port_query=57778\r',
  'tfc|Team Fortress Classic|valve|port=27015\r',
  'tf2|Team Fortress 2|valve|port=27015\r',
  'teamspeak2|Teamspeak 2|teamspeak2|port=8767\r',
  'teamspeak3|Teamspeak 3|teamspeak3|port=9987|doc_notes=teamspeak3\r',
  'terminus|Terminus|gamespy1|port_query=12286\r',
  'terraria,tshock|Terraria - TShock (2011)|terraria|port=7777,port_query_offset=101|doc_notes=terraria\r',
  "thps3|Tony Hawk's Pro Skater 3|gamespy1|port_query=6500\r",
  "thps4|Tony Hawk's Pro Skater 4|gamespy1|port_query=6500\r",
  "thu2|Tony Hawk's Underground 2|gamespy1|port_query=5153\r",
  'towerunite|Tower Unite|valve|port=27015\r',
  'trackmania2|Trackmania 2|nadeo|port=2350,port_query=5000|doc_notes=nadeo-shootmania--trackmania--etc\r',
  'trackmaniaforever|Trackmania Forever|nadeo|port=2350,port_query=5000|doc_notes=nadeo-shootmania--trackmania--etc\r',
  'tremulous|Tremulous|quake3|port_query=30720\r',
  'tribes1|Tribes 1: Starsiege|tribes1|port=28001\r',
  'tribesvengeance|Tribes: Vengeance|gamespy2|port=7777,port_query_offset=1\r',
  'tron20|Tron 2.0|gamespy2|port_query=27888\r',
  'turok2|Turok 2|gamespy1|port_query=12880\r',
  'universalcombat|Universal Combat|ase|port=1135,port_query_offset=123\r',
  '\r',
  'unreal|Unreal|gamespy1|port=7777,port_query_offset=1\r',
  'unturned|unturned|valve|port=27015,port_query_offset=1\r',
  'ut|Unreal Tournament|gamespy1|port=7777,port_query_offset=1\r',
  'ut2003|Unreal Tournament 2003|unreal2|port=7757,port_query_offset=1\r',
  'ut2004|Unreal Tournament 2004|unreal2|port=7777,port_query_offset=1\r',
  'ut3|Unreal Tournament 3|ut3|port=7777,port_query_offset=-1277\r',
  '\r',
  'urbanterror|Urban Terror|quake3|port_query=27960\r',
  'v8supercar|V8 Supercar Challenge|gamespy1|port_query=16700\r',
  'valheim|Valheim (2021)|valve|port=2456,port_query_offset=1|doc_notes=valheim\r',
  'vcmp|Vice City Multiplayer|vcmp|port=8192\r',
  'ventrilo|Ventrilo|ventrilo|port=3784\r',
  'vietcong|Vietcong|gamespy1|port=5425,port_query=15425\r',
  'vietcong2|Vietcong 2|gamespy2|port=5001,port_query=19967\r',
  'warsow|Warsow|warsow|port=44400\r',
  'wheeloftime|Wheel of Time|gamespy1|port=7777,port_query_offset=1\r',
  'wolfenstein2009|Wolfenstein 2009|doom3|port=27666\r',
  'wolfensteinet|Wolfenstein: Enemy Territory|quake3|port_query=27960\r',
  'xpandrally|Xpand Rally|ase|port=28015,port_query_offset=123\r',
  'zombiemaster|Zombie Master|valve|port=27015\r',
  'zps|Zombie Panic: Source|valve|port=27015\r',
  '',
]

class GameResolver {
  constructor() {
    const loaded = this._readGames()
    this.gamesByKey = loaded.gamesByKey
    this.games = loaded.games
  }

  lookup(type) {
    if (!type) throw Error('No game specified')

    if (type.substr(0, 9) === 'protocol-') {
      return {
        protocol: type.substr(9),
      }
    }

    const game = this.gamesByKey.get(type)
    if (!game) throw Error('Invalid game: ' + type)
    return game.options
  }

  printReadme() {
    let out = ''
    out += '| GameDig Type ID | Name | See Also\n'
    out += '|---|---|---\n'

    const sorted = this.games
      .filter((game) => game.pretty)
      .sort((a, b) => {
        return a.pretty.localeCompare(b.pretty)
      })
    for (const game of sorted) {
      let keysOut = game.keys.map((key) => '`' + key + '`').join('<br>')
      out += '| ' + keysOut.padEnd(10, ' ') + ' ' + '| ' + game.pretty
      let notes = []
      if (game.extra.doc_notes) {
        notes.push('[Notes](#' + game.extra.doc_notes + ')')
      }
      if (game.options.protocol === 'valve') {
        notes.push('[Valve Protocol](#valve)')
      }
      if (notes.length) {
        out += ' | ' + notes.join(', ')
      }
      out += '\n'
    }
    return out
  }

  _readGames() {
    const gamesByKey = new Map()
    const games = []

    for (let line of lines) {
      // strip comments
      const comment = line.indexOf('#')
      if (comment !== -1) line = line.substr(0, comment)
      line = line.trim()
      if (!line) continue

      const split = line.split('|')
      const keys = split[0].trim().split(',')
      const name = split[1].trim()
      const options = this._parseList(split[3])
      options.protocol = split[2].trim()
      const extra = this._parseList(split[4])

      const game = {
        keys: keys,
        pretty: name,
        options: options,
        extra: extra,
      }

      for (const key of keys) {
        gamesByKey.set(key, game)
      }
      games.push(game)
    }
    return { gamesByKey, games }
  }

  _parseList(str) {
    if (!str) return {}
    const out = {}
    for (const one of str.split(',')) {
      const equals = one.indexOf('=')
      const key = equals === -1 ? one : one.substr(0, equals)

      /** @type {string|number|boolean} */
      let value = equals === -1 ? '' : one.substr(equals + 1)

      if (value === 'true' || value === '') value = true
      else if (value === 'false') value = false
      else if (!isNaN(parseInt(value))) value = parseInt(value)

      out[key] = value
    }
    return out
  }
}

module.exports = GameResolver
