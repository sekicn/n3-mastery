
import { GrammarItem, GrammarCategory } from './types';

export const GRAMMAR_DATA: GrammarItem[] = [
  // 第1课 (原因・理由)
  { id: '1', lesson: 1, pattern: '～おかげで', function: '多亏……（感激/好结果）', connection: '名+の/形动+な/简体', exampleJP: '先生のおかげで、合格できました。', exampleCN: '多亏了老师，我考上了。', category: GrammarCategory.CORE, style: '通用' },
  { id: '2', lesson: 1, pattern: '～せいで', function: '都怪……（坏结果/推卸责任）', connection: '名+の/形动+な/简体', exampleJP: '雨のせいで、遠足が中止になった。', exampleCN: '都怪下雨，远足取消了。', category: GrammarCategory.CORE, style: '通用' },
  { id: '3', lesson: 1, pattern: '～ばかりに', function: '就因为……（导致坏结果/强烈后悔）', connection: '简体/名+である', exampleJP: '鍵を忘れたばかりに、中に入れない。', exampleCN: '就因为忘了带钥匙，进不去屋子。', category: GrammarCategory.ADVANCED, style: '口语', spokenAlternative: '～から（简单陈述原因）' },

  // 第2课 (状态・变化)
  { id: '4', lesson: 2, pattern: '～ばかり', function: '1. 刚刚做完 2. 净是', connection: '动た形/名词', exampleJP: '彼は食べてばかりいる。', exampleCN: '他光是在吃。', category: GrammarCategory.CORE, style: '口语' },
  { id: '5', lesson: 2, pattern: '～ばかりだ', function: '持续向某个方向变化（多指坏倾向）', connection: '动词原形', exampleJP: '物価は上がるばかりだ。', exampleCN: '物价一直在上涨。', category: GrammarCategory.ADVANCED, style: '通用' },
  { id: '6', lesson: 2, pattern: '～一方だ', function: '越来越……（变化趋势）', connection: '动词原形', exampleJP: '景気は悪くなる一方だ。', exampleCN: '经济越来越差。', category: GrammarCategory.ADVANCED, style: '书面', spokenAlternative: 'どんどん～（口语常用词）' },
  { id: '7', lesson: 2, pattern: '～一方で', function: '一方面……另一方面……（对比/并行）', connection: '简体/名+である', exampleJP: '子供を育てる一方で、仕事もしている。', exampleCN: '一方面养孩子，一方面也在工作。', category: GrammarCategory.ADVANCED, style: '书面', spokenAlternative: '～けど、その半面（口语替代）' },

  // 第3课 (目的・用途)
  { id: '8', lesson: 3, pattern: '～に（助词复习）', function: '用于……/在……（目的、地点、时间）', connection: '名词', exampleJP: '買い物に行く。', exampleCN: '去买东西。', category: GrammarCategory.CORE, style: '通用' },
  { id: '9', lesson: 3, pattern: '～には / ～のに', function: '为了/用于（表用途/目的）', connection: '动原（+の）/ 名词', exampleJP: '駅に行くには、この道が一番近いです。', exampleCN: '要去车站的话，这条路最近。', category: GrammarCategory.CORE, style: '通用' },

  // 第4课 (对象・关于)
  { id: '10', lesson: 4, pattern: '～にとって', function: '对……来说（评价视角）', connection: '名词', exampleJP: '私にとって、一番大切なのは家族です。', exampleCN: '对我来说，最重要的是家人。', category: GrammarCategory.CORE, style: '通用' },
  { id: '11', lesson: 4, pattern: '～に対して', function: '对于（对象）/与……相反（对比）', connection: '名词', exampleJP: '客に対して失礼だ。', exampleCN: '对客人很没礼貌。', category: GrammarCategory.ADVANCED, style: '通用' },
  { id: '12', lesson: 4, pattern: '～について', function: '关于（谈论的内容/内容范畴）', connection: '名词', exampleJP: '日本について研究する。', exampleCN: '研究关于日本。', category: GrammarCategory.CORE, style: '通用' },
  { id: '13', lesson: 4, pattern: '～に関して', function: '关于（更正式的书面/领域）', connection: '名词', exampleJP: 'その事件に関しては、お答えできません。', exampleCN: '关于那个事件，无法回答。', category: GrammarCategory.ADVANCED, style: '正式', spokenAlternative: '～について' },

  // 第5课 (依据・手段・地点)
  { id: '14', lesson: 5, pattern: '～によって', function: '根据/通过/由于/被', connection: '名词', exampleJP: '人によって考えが違う。', exampleCN: '因人而异想法不同。', category: GrammarCategory.CORE, style: '通用' },
  { id: '15', lesson: 5, pattern: '～によると / ～によれば', function: '据……说（传闻依据）', connection: '名词', exampleJP: 'ニュースによると、明日は雨だ。', exampleCN: '据新闻说，明天有雨。', category: GrammarCategory.CORE, style: '通用' },
  { id: '16', lesson: 5, pattern: '～にて', function: '在/用（书信/公告/商务）', connection: '名词', exampleJP: '本会場にて行います。', exampleCN: '在本会场进行。', category: GrammarCategory.ADVANCED, style: '书面', spokenAlternative: '～で（日常口语绝对用で）' },
  { id: '17', lesson: 5, pattern: '～において', function: '在……（领域、地点、时间）', connection: '名词', exampleJP: '現代社会において重要なこと。', exampleCN: '在现代社会重要的事情。', category: GrammarCategory.ADVANCED, style: '正式', spokenAlternative: '～で' },

  // 第6课 (伴随・身份・让步)
  { id: '18', lesson: 6, pattern: '～につれて', function: '随着（伴随变化）', connection: '动词原形/名词', exampleJP: '年を取るにつれて。', exampleCN: '随着年龄增长。', category: GrammarCategory.CORE, style: '通用' },
  { id: '19', lesson: 6, pattern: '～とともに', function: '随着/和……一起', connection: '动原/名词', exampleJP: '家族とともに過ごす。', exampleCN: '和家人一起度过。', category: GrammarCategory.ADVANCED, style: '书面', spokenAlternative: '～と一緒に' },
  { id: '20', lesson: 6, pattern: '～にしても / にしろ / にせよ', function: '即使……也……', connection: '简体', exampleJP: '行くにしても、連絡して。', exampleCN: '就算要去，也联系一下。', category: GrammarCategory.ADVANCED, style: '通用' },
  { id: '21', lesson: 6, pattern: '～としても', function: '就算……也（假设让步）', connection: '简体', exampleJP: 'もし本当だとしても信じない。', exampleCN: '就算是真的我也不信。', category: GrammarCategory.ADVANCED, style: '通用' },
  { id: '22', lesson: 6, pattern: '～として', function: '作为（身份、地位）', connection: '名词', exampleJP: '趣味として。', exampleCN: '作为爱好。', category: GrammarCategory.CORE, style: '通用' },
  { id: '23', lesson: 6, pattern: '～を～として', function: '把……作为……', connection: '名+を+名+として', exampleJP: '彼をリーダーとして選んだ。', exampleCN: '选他作为领导。', category: GrammarCategory.ADVANCED, style: '通用' },

  // 第7课 (比较・代替)
  { id: '24', lesson: 7, pattern: '～に比べて', function: '和……相比', connection: '名词', exampleJP: '去年に比べて暑い。', exampleCN: '和去年相比热。', category: GrammarCategory.CORE, style: '通用' },
  { id: '25', lesson: 7, pattern: '～かわりに', function: '代替/交换/补偿', connection: '名+の/动原', exampleJP: 'コーヒーのかわりに紅茶を飲む。', exampleCN: '不喝咖啡喝红茶。', category: GrammarCategory.CORE, style: '通用' },
  { id: '26', lesson: 7, pattern: '～にかわって', function: '代表……（身份替换）', connection: '名词', exampleJP: '父にかわって挨拶する。', exampleCN: '代表父亲致辞。', category: GrammarCategory.ADVANCED, style: '通用' },

  // 第8课 (契机・视点)
  { id: '27', lesson: 8, pattern: '～きっかけ', function: '以……为契机', connection: '名词+をきっかけに', exampleJP: 'アニメをきっかけに勉強し始めた。', exampleCN: '以动画为契机开始学习。', category: GrammarCategory.CORE, style: '通用' },
  { id: '28', lesson: 8, pattern: '～から言うと / から見ると / からすると', function: '从……来看/判断', connection: '名词', exampleJP: '実力から言うと、彼が勝つはずだ。', exampleCN: '从实力来看，他应该会赢。', category: GrammarCategory.ADVANCED, style: '通用' },

  // 第9课 (话题・逆接・假定)
  { id: '29', lesson: 9, pattern: '～というと / といえば', function: '说起……（联想话题）', connection: '名词', exampleJP: '日本というと寿司だ。', exampleCN: '说起日本就是寿司。', category: GrammarCategory.CORE, style: '口语' },
  { id: '30', lesson: 9, pattern: '～といっても', function: '虽说……（修正描述）', connection: '简体', exampleJP: '安いといっても、1万円はする。', exampleCN: '虽说便宜，也要1万日元。', category: GrammarCategory.CORE, style: '口语' },
  { id: '31', lesson: 9, pattern: '～とすると / とすれば / としたら', function: '假如/既然', connection: '简体', exampleJP: '本当だとしたら、大変だ。', exampleCN: '假如是真的，那就麻烦了。', category: GrammarCategory.ADVANCED, style: '通用' },

  // 第10课 (道理・可能性)
  { id: '32', lesson: 10, pattern: '～わけ', function: '原因/道理/情理', connection: '简体/名+の/形动+な', exampleJP: 'どういうわけか。', exampleCN: '到底是什么原因。', category: GrammarCategory.CORE, style: '通用' },
  { id: '33', lesson: 10, pattern: '～わけだ', function: '怪不得/也就是说', connection: '简体', exampleJP: '道理で暑いわけだ。', exampleCN: '怪不得这么热。', category: GrammarCategory.CORE, style: '口语' },
  { id: '34', lesson: 10, pattern: '～わけではない', function: '并不是（部分否定）', connection: '简体', exampleJP: '嫌いなわけではない。', exampleCN: '并不是讨厌。', category: GrammarCategory.CORE, style: '通用' },
  { id: '35', lesson: 10, pattern: '～わけがない', function: '绝对不可能', connection: '简体', exampleJP: 'できるわけがない。', exampleCN: '不可能做得到。', category: GrammarCategory.CORE, style: '口语', spokenAlternative: '～はずがない' },
  { id: '36', lesson: 10, pattern: '～わけにはいかない', function: '不能……（碍于情理、规则）', connection: '动原', exampleJP: '休むわけにはいかない。', exampleCN: '不能请假。', category: GrammarCategory.CORE, style: '通用' },

  // 第11课 (推测・义务・程度)
  { id: '37', lesson: 11, pattern: '～はずだ', function: '应该（基于事实推测）', connection: '简体/名+の/形动+な', exampleJP: '来るはずだ。', exampleCN: '应该会来。', category: GrammarCategory.CORE, style: '通用' },
  { id: '38', lesson: 11, pattern: '～べきだ', function: '理应/应该（义务）', connection: '动原', exampleJP: '守るべきだ。', exampleCN: '应当遵守。', category: GrammarCategory.ADVANCED, style: '书面', spokenAlternative: '～たほうがいい' },
  { id: '39', lesson: 11, pattern: '～ほど / ～ぐらい', function: '大约/程度/比较', connection: '名词/动词', exampleJP: '死ぬほど疲れた。', exampleCN: '累得要死。', category: GrammarCategory.CORE, style: '通用' },

  // 第12课 (建议・感慨・本质)
  { id: '40', lesson: 12, pattern: '～ものだ', function: '本来就是/感慨/回忆', connection: '动/形简体', exampleJP: '時間は早いものだ。', exampleCN: '时间过得真快啊。', category: GrammarCategory.CORE, style: '通用' },
  { id: '41', lesson: 12, pattern: '～ことだ', function: '最好/应该（忠告、建议）', connection: '动原/动ない', exampleJP: '無理をしないことだ。', exampleCN: '最好不要勉强。', category: GrammarCategory.ADVANCED, style: '口语' },
  { id: '42', lesson: 12, pattern: '～もの/こと（辨析）', function: '形式名词辨析', connection: '多样', exampleJP: '大切なことは…。', exampleCN: '重要的事情是……', category: GrammarCategory.ADVANCED, style: '通用' },
  { id: '43', lesson: 12, pattern: '～ものだから', function: '因为……嘛（辩解）', connection: '简体', exampleJP: '遅れたものだから。', exampleCN: '因为迟到了嘛。', category: GrammarCategory.ADVANCED, style: '口语', spokenAlternative: '～もんだから' },

  // 第13课 (决定・打算・感觉)
  { id: '44', lesson: 13, pattern: '～ことにする', function: '（我）决定……', connection: '动原/动ない', exampleJP: '毎日走ることにする。', exampleCN: '决定每天跑步。', category: GrammarCategory.CORE, style: '通用' },
  { id: '45', lesson: 13, pattern: '～つもり', function: '打算/当作', connection: '动原/动た/名+の', exampleJP: 'そのつもりだ。', exampleCN: '有那个打算。', category: GrammarCategory.CORE, style: '通用' },
  { id: '46', lesson: 13, pattern: '～気がする', function: '感觉/觉得', connection: '简体', exampleJP: 'そんな気がする。', exampleCN: '有那种感觉。', category: GrammarCategory.CORE, style: '口语' },
  { id: '47', lesson: 13, pattern: '～味がする / 音がする', function: '有……味道/声音', connection: '名词', exampleJP: '変な味がする。', exampleCN: '有奇怪的味道。', category: GrammarCategory.CORE, style: '通用' },

  // 第14课 (限定・累加)
  { id: '48', lesson: 14, pattern: '～だけ', function: '只/仅仅', connection: '名词/简体', exampleJP: '見るだけ。', exampleCN: '只是看看。', category: GrammarCategory.CORE, style: '通用' },
  { id: '49', lesson: 14, pattern: '～だけでなく', function: '不仅……而且……', connection: '名词/简体', exampleJP: '肉だけでなく野菜も。', exampleCN: '不仅是肉，蔬菜也。', category: GrammarCategory.CORE, style: '通用' },
  { id: '50', lesson: 14, pattern: '～だけでは', function: '光是……的话', connection: '名词/简体', exampleJP: 'それだけでは足りない。', exampleCN: '光是那样还不充足。', category: GrammarCategory.ADVANCED, style: '通用' },
  { id: '51', lesson: 14, pattern: '～うえに', function: '而且/加上', connection: '简体/名+の/形动+な', exampleJP: '安いうえにおいしい。', exampleCN: '便宜而且好吃。', category: GrammarCategory.ADVANCED, style: '通用' },
  { id: '52', lesson: 14, pattern: '～うえで', function: '在……之后/在……方面', connection: '动た/名+の', exampleJP: '相談したうえで決める。', exampleCN: '商量之后再决定。', category: GrammarCategory.ADVANCED, style: '书面', spokenAlternative: '～てから' },

  // 第15课 (逆接・评价)
  { id: '53', lesson: 15, pattern: '～ながら', function: '虽然……但是……', connection: '动ます形/名/形', exampleJP: '残念ながら。', exampleCN: '虽然很遗憾。', category: GrammarCategory.CORE, style: '通用' },
  { id: '54', lesson: 15, pattern: '～くせに', function: '明明……却……（抱怨/蔑视）', connection: '名+の/形动+な/简体', exampleJP: '知らないくせに。', exampleCN: '明明不知道（却装知道）。', category: GrammarCategory.CORE, style: '口语' },
  { id: '55', lesson: 15, pattern: '～わりには', function: '虽说……但是（意外结果）', connection: '名+の/简体', exampleJP: '値段のわりには良い。', exampleCN: '虽然便宜但（意外地）不错。', category: GrammarCategory.CORE, style: '口语' },
  { id: '56', lesson: 15, pattern: '～にしては', function: '就……而言（照标准看意外）', connection: '名词/动简体', exampleJP: '子供にしては上手だ。', exampleCN: '作为小孩子来说很擅长了。', category: GrammarCategory.CORE, style: '口语' },

  // 第16课 (无法・极限)
  { id: '57', lesson: 16, pattern: '～ようがない', function: '没办法……（无手段）', connection: '动ます形', exampleJP: '連絡しようがない。', exampleCN: '没办法联系。', category: GrammarCategory.ADVANCED, style: '口语' },
  { id: '58', lesson: 16, pattern: '～てしょうがない / しかたがない', function: '……得不得了（生理/情感）', connection: 'て形', exampleJP: '会いたくてしょうがない。', exampleCN: '想见你想得不得了。', category: GrammarCategory.CORE, style: '口语' },
  { id: '59', lesson: 16, pattern: '～てたまらない', function: '……得受不了（本能欲望）', connection: 'て形', exampleJP: 'お腹が空いてたまらない。', exampleCN: '肚子饿得受不了。', category: GrammarCategory.ADVANCED, style: '口语' },
  { id: '60', lesson: 16, pattern: '～てならない', function: '……得不行/不由得', connection: 'て形', exampleJP: '気になってならない。', exampleCN: '不由得非常担心。', category: GrammarCategory.ADVANCED, style: '书面', spokenAlternative: '～てしょうがない' },

  // 第17课 (禁止・极限)
  { id: '61', lesson: 17, pattern: '～てはならない', function: '不能/禁止（法律、规章）', connection: 'て形', exampleJP: '忘れてはならない。', exampleCN: '不能忘记。', category: GrammarCategory.ADVANCED, style: '正式', spokenAlternative: '～ちゃダメ' },
  { id: '62', lesson: 17, pattern: '～きる', function: '……完/彻底……', connection: '动ます形', exampleJP: '読みきる。', exampleCN: '读完。', category: GrammarCategory.CORE, style: '通用' },
  { id: '63', lesson: 17, pattern: '～きり', function: '仅仅/自从……以后再没', connection: '名/动た', exampleJP: '一度会ったきりだ。', exampleCN: '只见过一次后再没见过。', category: GrammarCategory.ADVANCED, style: '口语' },

  // 第18课 (时间・尝试・解决)
  { id: '64', lesson: 18, pattern: '～て以来', function: '自从……以来（一直）', connection: 'て形', exampleJP: '卒業して以来。', exampleCN: '毕业以来。', category: GrammarCategory.ADVANCED, style: '书面', spokenAlternative: '～てからずっと' },
  { id: '65', lesson: 18, pattern: '～てみる', function: '试着……', connection: 'て形', exampleJP: 'やってみる。', exampleCN: '试着做做。', category: GrammarCategory.CORE, style: '通用' },
  { id: '66', lesson: 18, pattern: '～てごらん', function: '试着……（长辈对晚辈）', connection: 'て形', exampleJP: '食べてごらん。', exampleCN: '（你）尝尝看。', category: GrammarCategory.ADVANCED, style: '口语' },
  { id: '67', lesson: 18, pattern: '～て済む', function: '……就解决了', connection: 'て形', exampleJP: '謝って済む。', exampleCN: '道歉就解决了。', category: GrammarCategory.ADVANCED, style: '通用' },
  { id: '68', lesson: 18, pattern: '～ずに済む / ないで済む', function: '不用……就解决了', connection: '动ない形/动词', exampleJP: '買わずに済んだ。', exampleCN: '没买也解决了（不用买也行）。', category: GrammarCategory.ADVANCED, style: '通用' },

  // 第19课 (充满·贬义)
  { id: '69', lesson: 19, pattern: '～だらけ', function: '净是/满是（贬义）', connection: '名词', exampleJP: '泥だらけ。', exampleCN: '满是泥。', category: GrammarCategory.CORE, style: '通用' },
  { id: '70', lesson: 19, pattern: '～まみれ', function: '沾满（液体/粉末：血、汗、泥、粉）', connection: '名词', exampleJP: '血まみれ。', exampleCN: '沾满血。', category: GrammarCategory.ADVANCED, style: '通用' },

  // 第20课 (难以・可能)
  { id: '71', lesson: 20, pattern: '～がたい', function: '难以……（心理/情感上做不到）', connection: '动ます形', exampleJP: '信じがたい。', exampleCN: '难以置信。', category: GrammarCategory.ADVANCED, style: '书面', spokenAlternative: '～にくい' },
  { id: '72', lesson: 20, pattern: '～かねる', function: '难以……（礼貌拒绝）', connection: '动ます形', exampleJP: '決めかねる。', exampleCN: '难以决定。', category: GrammarCategory.ADVANCED, style: '正式', spokenAlternative: '～できない' },
  { id: '73', lesson: 20, pattern: '～かねない', function: '恐怕会……（负面推测）', connection: '动ます形', exampleJP: '事故になりかねない。', exampleCN: '恐怕会出事故。', category: GrammarCategory.ADVANCED, style: '通用' },

  // 第21课 (接尾词・频率)
  { id: '74', lesson: 21, pattern: '～さ', function: '程度（名词化）', connection: '形去い', exampleJP: '高さ。', exampleCN: '高度。', category: GrammarCategory.CORE, style: '通用' },
  { id: '75', lesson: 21, pattern: '～み', function: '感觉/状态（名词化）', connection: '形去い', exampleJP: '痛み。', exampleCN: '疼痛。', category: GrammarCategory.CORE, style: '通用' },
  { id: '76', lesson: 21, pattern: '～おきに', function: '每隔……', connection: '名词（数量）', exampleJP: '5分おきに。', exampleCN: '每隔5分钟。', category: GrammarCategory.CORE, style: '通用' },
  { id: '77', lesson: 21, pattern: '～ごとに', function: '每……/每当……', connection: '名词/动原', exampleJP: '日ごとに。', exampleCN: '逐日/每天。', category: GrammarCategory.CORE, style: '通用' },
  { id: '78', lesson: 21, pattern: '～たびに', function: '每当……', connection: '名+の/动原', exampleJP: '会うたびに。', exampleCN: '每次见面时。', category: GrammarCategory.CORE, style: '通用' },

  // 第22课 (倾向・样态)
  { id: '79', lesson: 22, pattern: '～がち', function: '容易……（负面高频）', connection: '动ます形/名词', exampleJP: '病気がちだ。', exampleCN: '老是生病。', category: GrammarCategory.CORE, style: '通用' },
  { id: '80', lesson: 22, pattern: '～気味（ぎみ）', function: '有点……倾向（身心感觉）', connection: '动ます形/名词', exampleJP: '風邪気味。', exampleCN: '有点感冒。', category: GrammarCategory.ADVANCED, style: '口语' },
  { id: '81', lesson: 22, pattern: '～ぶり', function: '……的样子/时隔……', connection: '动ます形/名词', exampleJP: '10年ぶり。', exampleCN: '时隔十年。', category: GrammarCategory.ADVANCED, style: '通用' },

  // 补充至88个 (N3核心口语/重要项)
  { id: '82', lesson: 9, pattern: '～っけ', function: '是……来着？（口语确认）', connection: '简体+っけ', exampleJP: '何だったっけ。', exampleCN: '是什么来着？', category: GrammarCategory.CORE, style: '口语' },
  { id: '83', lesson: 10, pattern: '～っこない', function: '绝不……/绝对不会', connection: '动ます形', exampleJP: 'わかりっこない。', exampleCN: '绝对不可能懂的。', category: GrammarCategory.ADVANCED, style: '口语' },
  { id: '84', lesson: 10, pattern: '～はずがない', function: '不可能（基于逻辑的否定）', connection: '简体/名+の/形动+な', exampleJP: 'そんなはずがない。', exampleCN: '不可能有那种事。', category: GrammarCategory.CORE, style: '通用' },
  { id: '85', lesson: 14, pattern: '～さえ', function: '甚至……/连……', connection: '名词/格助词', exampleJP: '名前さえ書けない。', exampleCN: '连名字都不会写。', category: GrammarCategory.CORE, style: '通用' },
  { id: '86', lesson: 14, pattern: '～こそ', function: '正是……/唯有……（强调）', connection: '名词', exampleJP: '今年こそ合格する。', exampleCN: '今年一定要考上。', category: GrammarCategory.CORE, style: '通用' },
  { id: '87', lesson: 12, pattern: '～とか', function: '听说……/说是……（传闻）', connection: '简体', exampleJP: '結婚するとか。', exampleCN: '听说要结婚了。', category: GrammarCategory.ADVANCED, style: '口语' },
  { id: '88', lesson: 17, pattern: '～っ放し', function: '就那样放着/一直……（放置）', connection: '动ます形', exampleJP: '開けっ放し。', exampleCN: '开着不关。', category: GrammarCategory.ADVANCED, style: '口语' }
];

export const SRS_INTERVALS = [0, 1, 3, 7, 14, 30];
