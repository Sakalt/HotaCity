# EnchantCity

<http://9leap.net/games/3339/>からプレイできます。  

SimCityにタワーディフェンスの要素を加えた街作りシュミレーションゲーム。  

12月1日から始まり、クリスマスを迎えるまで、道路や住宅地、商業地を建設して住民を住まわせ、  
工業地を建設してモンスターを倒してお金を稼いで街を発展させよう。  
人口100人達成してクリスマスを迎えると何かが起こる！  

上記リンクからゲームを開始できるが、最初何をしたら良いかさっぱり分からないと思うので、手順（チュートリアル）を説明する。  

## 動作するブラウザ

Chorme, Firefox, Safari, Internet Explorer, iPhone/iPod, Android  
※ IEでSE,BGMが再生されない。  
※ IEでチュートリアルが動作しない。(Start with tutorialは選択せず、Startのみ選択してください。)  

## 画面構成

まず画面構成から説明します。  

### ステータスメニュー

![enchantcity.01.00.statusmenu](/README/enchantcity.01.00.statusmenu.png)  
画面の一番上にあるのがステータスメニューです。  

#### 時間

![enchantcity.01.01.date](/README/enchantcity.01.01.date.png)  
ステータスメニューの一番左が日付を表します。  
12月1日から始まり、ゲーム内独自の時間でリアルタイムに進んでいきます。  
時間を止めることはできません。  

#### 人口

![enchantcity.01.02.population](/README/enchantcity.01.02.population.png)  
次に右が人口を表します。  
このゲームの目的は、人口を増やすことなので、一番重要なパラメータです。  
最初は0人で、後述する住宅地を建てると人口が増えます。  
しかし、人がモンスターに殺されたり、住宅地がモンスターに壊されるか、ユーザー自らに壊されると人口も減ります。  

#### お金

![enchantcity.01.03.cash](/README/enchantcity.01.03.cash.png)  
次に右がお金を表します。  
お金は最初50から始まり、  
建物を建設するとお金が減り、モンスターを倒すとお金が増えます。  
建物の建設費とモンスターを倒したときに貰える額は以下の通り。  
道路：2減  
住宅地：5減  
商業地：10減  
工業地：10減  
モンスターを倒すと1増  

#### BGMボタン

![enchantcity.01.04.bgm](/README/enchantcity.01.04.bgm.png)  
次に右がBGMボタンです。  
BGMをオン/オフできます。  
最初はオンになっている。  
※現在、IEではBGMが再生されないバグあり。  

#### 終了ボタン

![enchantcity.01.05.end](/README/enchantcity.01.05.end.png)  
一番右が終了ボタンです。  
終了ボタンを押すとダイアログが表示されて本当に終了するか聞いてくるので、  
「はい」を押すとゲーム終了。  
このゲームはユーザー自ら終了しない限り、永遠と動き続けます。  

### メインメニュー

![enchantcity.02.00.mainmenu](/README/enchantcity.02.00.mainmenu.png)  
次に一段下がってメインメニューを説明します。  

#### 道路建設ボタン

![enchantcity.02.01.road](/README/enchantcity.02.01.road.png)  
一番左が道路建設ボタンです。  
道路建設ボタンを押してチェックにした状態で、フィールドをクリックすると道路を建設できます。  
ただし、道路は後述する高速道路に繋がっていないと建設できません。  
また、海にも建設できません。  
草原、森林、砂漠は建設でき、どれに建設しても効果は同じです。  
道路を建設するためには、お金が2かかります。  

#### 区画ボタン

![enchantcity.02.02.region](/README/enchantcity.02.02.region.png)  
次に右が区画ボタンです。  
区画ボタンを押すと下段に区画メニューが表示され、住宅地、商業地、工業地を建設できます。  
区画メニューについては、後ほど説明します。  

#### 破壊ボタン

![enchantcity.02.03.destroy](/README/enchantcity.02.03.destroy.png)  
次に右が破壊ボタンです。  
破壊ボタンを押してチェックにした状態で、建物をクリックすると破壊できます。  
ただし、高速道路と他の建物を切断する破壊はできません。  
道路を破壊したいときは、高速道路から一番遠い道路から順番に破壊してください。  

#### カーソルボタン

![enchantcity.02.04.cursor](/README/enchantcity.02.04.cursor.png)  
一番右がカーソルボタンです。  
破壊ボタンを押してチェックにした状態で、建物をクリックすると建物ダイアログが表示され、建物に入っている人の種類と数が分かります。  
建物ダイアログについては、後ほど説明します。  

### 区画メニュー

![enchantcity.03.00.regionmenu](/README/enchantcity.03.00.regionmenu.png)  
メインメニューで区画ボタンを押すと区画メニューが表示されます。  
区画メニューについて説明します。  

#### 住宅地ボタン

![enchantcity.03.01.town](/README/enchantcity.03.01.town.png)  
一番左が住宅地ボタンです。  
住宅地ボタンを押してチェックにした状態で、フィールドをクリックすると住宅地が建設できます。  
ただし、道路に隣接した場所にしか建設できません。  
また、海にも建設できません。  
草原、森林、砂漠に建設でき、どれに建設しても効果は同じです。  
住宅地を建設するためには、お金が5かかります。  
住宅地を建設すると高速道路から家族（労働者1人、買い物客1人、学生2人の計4人）が引っ越してきます。  
住宅地はモンスターに入居されると、破壊されます。  
住宅地は労働者が12時間以上、家賃を支払わないと、倒産します。  
住宅地が破壊された場合、その住宅地に入居中の家族も消滅します。  
住宅地に怪我をした家族が入居していると、救急車マークが表示されます。  

#### 商業地ボタン

![enchantcity.03.02.castle](/README/enchantcity.03.02.castle.png)  
次に右が商業地ボタンです。  
商業地ボタンを押してチェックにした状態で、フィールドをクリックすると商業地が建設できます。  
ただし、道路に隣接した場所にしか建設できません。  
また、海にも建設できません。  
草原、森林、砂漠に建設でき、どれに建設しても効果は同じです。  
商業地を建設するためには、お金が10かかります。  
商業地は買い物客が食べ物を買うために必要です。  
商業地には、買い物客が同時に5人まで入ることができます。  
買い物客について後ほど説明します。  
商業地はモンスターに入居されると、破壊されます。  
商業地は買い物客が12時間以上、買い物に来ないと、倒産します。  

#### 工業地ボタン

![enchantcity.03.03.dungeon](/README/enchantcity.03.03.dungeon.png)  
一番右が工業地ボタンです。  
工業地ボタンを押してチェックにした状態で、フィールドをクリックすると工業地が建設できます。  
ただし、道路に隣接した場所にしか建設できません。  
また、海にも建設できません。  
草原、森林、砂漠に建設でき、どれに建設しても効果は同じです。  
工業地を建設するためには、お金が10かかります。  
工業地を建設するとゲーム内時間で30分おきにモンスターが出現します。  
工業地ダイアログからモンスターの出現を一時停止できます。  
モンスターについて後ほど説明します。  

### フィールド

次にフィールドについて説明する。  

#### 高速道路

![enchantcity.04.01.highway](/README/enchantcity.04.01.highway.png)  
これは高速道路です。  
高速道路は街の入り口となるため、非常に重要です。  
道路は高速道路に繋がっていないと建設できません。  
また、住宅地を建設した場合、高速道路から家族が引っ越してきます。  
高速道路は建設できないし、破壊もできません。  

#### 海

![enchantcity.04.02.sea](/README/enchantcity.04.02.sea.png)  
これは海です。  
海には建物を建設できません。  

#### 草原、砂漠、森林

![enchantcity.04.03.grass](/README/enchantcity.04.03.grass.png)  
![enchantcity.04.04.desert](/README/enchantcity.04.04.desert.png)  
![enchantcity.04.05.forest](/README/enchantcity.04.05.forest.png)  
上から順に草原、砂漠、森林です。  
これらに建物を建設できます。  
また、効果も同じで、見た目以外の違いはありません。  

以上で画面の説明は終わりです。  

## チュートリアル

次は手順（チュートリアル）を説明します。  

![enchantcity.05.01.tutorial](/README/enchantcity.05.01.tutorial.png)  
手順1.  
まずは、上記のスクリーンショットの通り、高速道路の隣に道路を2つ建設しましょう。  

![enchantcity.05.02.tutorial](/README/enchantcity.05.02.tutorial.png)  
手順2.  
次に、上記のスクリーンショットの通り、道路を囲むように住宅地を3つ建設しましょう。  
住宅地を建設すると、高速道路からそれぞれの住宅地に家族が引っ越してきますよ。  

![enchantcity.05.03.tutorial](/README/enchantcity.05.03.tutorial.png)  
手順3.  
次に、上記のスクリーンショットの通り、商業地を1つ建設しましょう。  
商業地を建設すると、住宅地から買い物客が商業地へ買い物に行きますよ。  

![enchantcity.05.04.tutorial](/README/enchantcity.05.04.tutorial.png)  
手順4.  
次に、上記のスクリーンショットの通り、縦に道路を5つ建設しましょう。  

![enchantcity.05.05.tutorial](/README/enchantcity.05.05.tutorial.png)  
手順5.  
次に、上記のスクリーンショットの通り、道路の端に工業地1つ建設しましょう。  
工業地を建設してからゲーム時間内で30分経つと、工場地からモンスターが出てきます。  
さらに、労働者がモンスターを倒しに住宅地から出てきますよ。  
労働者がモンスターを倒すと、お金が1増えます。  
こうして、街の住人の生活が始まりました。  

チュートリアルで示した配置は言わば定石で、この配置では順調にお金が増えていきます。  
ここからさらに街を発展させるのはプレイヤーの腕次第。  
人口100人達成してクリスマスを迎えると何かが起こる特典付きです。  

## キャラクター

次はキャラクターについて説明します。  

### 労働者

![worker](/README/worker.png)![worker.02](/README/worker.02.png)  
これは労働者です。  
住宅地1つに付き、1人入居できます。  
工業地からモンスターが出現した場合、労働者の体力が1以上の場合、労働者はモンスターを倒しに出勤します。  
ただし、労働者の行動範囲は10マスです。  
モンスターが住宅地の10マス以内に来ないと労働者は出勤しません。  
体力が1以上の場合にモンスターに接触すると、モンスターを倒せます。  
体力が0の場合にモンスターに接触すると、怪我をします。  
怪我をすると紫色に変色し、住宅地から出れなくなります。  
モンスターを倒すとモンスター1匹に付き、体力が1減り、お金1と家賃1が増えます。  
体力が0になると住宅地に戻ります。  
労動者の家賃が1以上の場合、労働者は住宅地に家賃を支払います。  
労働者は最初街に引っ越してきたときは、体力0、家賃0です。  
体力は買い物客から食べ物をもうらことで、食べ物1つに付き、体力が1回復できます。  

### 買い物客

![shopper](/README/shopper.png)![shopper.02](/README/shopper.02.png)  
これは買い物客です。  
住宅地1つに付き、1人入居できます。  
同じ住宅地に労働者が入居していて、かつ、労働者の体力が0の場合、買い物客は労働者に食べ物を与えます。  
食べ物が0の場合、商業地へ食べ物を買いに行きます。  
ただし、買い物客の行動範囲は10マスです。  
商業地が住宅地の10マス以内にないと買い物へ行きません。  
食べ物を買うのにお金はかからりません。  
買い物客1人に付き、食べ物は1つしか持てません。  
モンスターに接触すると怪我をします。  
怪我をすると紫色に変色し、住宅地から出れなくなります。  

### 学生

![student](/README/student.png)![student2](/README/student2.png)![student0.02](/README/student0.02.png)![student1.02](/README/student1.02.png)  
これは学生です。  
住宅地1つに付き、2人入居できます。  
今のところ学生に役割はありません。  
モンスターに接触すると怪我をします。  
怪我をすると紫色に変色し、住宅地から出れなくなります。  

### モンスター

![monster](/README/monster.png)  
これはモンスターです。  
工業地からゲーム時間内で30分間隔で出現します。  
モンスターは住宅地と商業地を目指して、襲ってきます。  
襲う建物が無い場合は高速道路を目指します。  
モンスターは労働者と接触した場合、労働者の体力が1以上ある場合、倒されて、労働者にお金1と家賃1を与えます。  
労働者の体力が0の場合、労働者に怪我をさせて、モンスター自身は死にます。この場合は、何も与えません。  
モンスターは買い物客と接触した場合、買い物客に怪我をさせて、モンスター自身は死にます。  
モンスターは学生と接触した場合、学生に怪我をさせて、モンスター自身は死にます。  
モンスターは住宅地に入居した場合、住宅地を破壊して、モンスター自身は死にます。  
モンスターは商業地に入居した場合、商業地を破壊して、モンスター自身は死にます。  
　

## エフェクト

次はエフェクトについて説明します。  
　
### 破壊

![enchantcity.07.01.destroy](/README/enchantcity.07.01.destroy.png)  
これは建物が破壊された場合に表示されるエフェクトです。  
ユーザー自ら破壊した場合、モンスターによって破壊された場合に表示されます。  
建物が破壊されると、その土地は更地に戻ります。  
　
### 倒産

![enchantcity.07.02.liquidate](/README/enchantcity.07.02.liquidate.png)  
これは住宅地の賃貸が支払われなった場合、商業地に買い物客が来ない場合に建物が倒産する場合に表示されるエフェクトです。  
建物が倒産すると、その土地は更地に戻ります。  
　
### 稼動停止

![enchantcity.07.05](/README/enchantcity.07.05.png)　→　![enchantcity.07.06](/README/enchantcity.07.06.png)  
これは工業地を稼動停止した場合に表示されるエフェクトです。  
工業地を稼動停止した場合は、工業地に停止マークが赤く点滅します。  
　
### 怪我

![enchantcity.07.03](/README/enchantcity.07.03.png)　→　![enchantcity.07.04](/README/enchantcity.07.04.png)  
これは住宅地に怪我をした家族が入居している場合に表示されるエフェクトです。  
住宅地に怪我をした家族が入居している場合は、住宅地に救急車マークが紫色に点滅します。  
　

## 建物ダイアログ

次は建物ダイアログについて説明します。  
　
### 住宅地ダイアログ

![enchantcity.08.01](/README/enchantcity.08.01.png)![enchantcity.08.02](/README/enchantcity.08.02.png)  
これは住宅地ダイアログです。  
W, Sp, Stの文字は下記の意味を持ちます。  
W: 労働者の怪我人数 / 労働者の住居人数  
Sp: 買い物客の怪我人数 / 買い物客の住居人数  
St: 学生の怪我人数 / 学生の住居人数  
また、救急車マークのボタンは治療ボタンです。  
住宅地に怪我人が全く居ないときは白くなり、1人でもいると赤くなります。  
治療ボタンを押すとその住宅地の怪我人を全員治療します。  
治療には1人に付きお金2がかかります。  
お金が足りない場合は治療できません。  
　
### 商業地ダイアログ

![enchantcity.08.03](/README/enchantcity.08.03.png)  
これは商業地ダイアログです。  
W, Sp, Stの文字は下記の意味を持ちます。  
W: 商業地に訪れいてる労働者数  
Sp: 商業地に訪れいてる買い物客数  
St: 商業地に訪れいてる学生数  
　
### 工業地ダイアログ

![](/README/enchantcity.08.04.png)![enchantcity.08.05](/README/enchantcity.08.05.png)  
これは工業地ダイアログです。  
商業地が稼動している場合は稼働中が表示され、停止している場合は停止中がが表示されます。  
また、再生ボタン/停止ボタンを押すことで、稼動/停止を切り替えられます。  
　

## ゲーム内生活サイクル

### 正常な生活サイクル

次はゲーム内の生活サイクルについて説明します。  
1.住宅地が建設されると、家族が入居します。  
　新規入居時点の家族は、労働者の体力0、家賃0、買い物客の食べ物0です。  
2.商業地が建設されると、買い物客が商業地へ食べ物を買い物に行きます。  
3.買い物客が買い物した商業地は、12時間倒産しません。  
4.買い物を終えた買い物客は住宅地へ戻ります。  
5.住宅地に戻った買い物客は労働者に食べ物を与えます。  
6.食べ物を与えられた労働者は体力が回復します。  
7.食べ物が無くなった買い物客は、また商業地へ買い物へ行きます。  
8.工業地が建設されると、モンスターが出現します。 
9.体力の回復した労働者は、モンスターを倒しに行きます。  
10.モンスターと接触した労働者は、体力が0になる代わりに、モンスターを倒して家賃を1得ます（このとき、ユーザーはお金を1得ます）  
11.モンスターを倒した労働者は住宅地へ戻ります。  
12.住宅地に戻った労働者は、住宅地に家賃を支払います。  
13.家賃が支払われた住宅地は12時間倒産しません。  
14.買い物客は体力0の労働者に食べ物を与えます。  
15.以下、上記の生活サイクルの繰り返しです。  

### 生活サイクルが崩れるケース

ただし、上記の生活サイクルが崩れるケースがあります。  
そのケースは以下の通り。  
A.モンスターが住宅地に入居した場合、住宅地が破壊され、その住宅地に入居している家族も消滅します。  
B.モンスターが商業地に入居した場合、商業地が破壊され、その商業地で買い物している買い物客も消滅します。  
C.モンスターが体力0の労働者と接触した場合、その労働者に怪我をさせます。  
D.モンスターが買い物客と接触した場合、その買い物客に怪我をさせます。  
E.モンスターが学生と接触した場合、その学生に怪我をさせます。  
F.12時間家賃が支払われなかった住宅地は倒産し、その住宅地に入居している家族も消滅します。  
G.12時間買い物客が買い物しなかった商業地は倒産します。  

## 使用したオープンソースプロジェクト

  * [enchant.js](http://enchantjs.com/ja/)
  * BGM、効果音 - [魔王魂](http://maoudamashii.jokersounds.com/)
  * キャラクターグラフィック - [ESPRI](http://espri-q.jugem.jp/)

これらのプロジェクトの全ての寄稿者および開発者に感謝いたします！

## ライセンス

The GPL version 3, read it at <http://www.gnu.org/licenses/gpl.txt> 

## 寄稿者

URL: [SimtterCom](http://blog.simtter.com/) 

