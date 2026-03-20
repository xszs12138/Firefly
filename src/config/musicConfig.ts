import type { MusicPlayerConfig } from "../types/config";

// 音乐播放器配置
export const musicPlayerConfig: MusicPlayerConfig = {
	// 禁用音乐播放器方法：
	// 模板默认侧边栏和导航栏两个都显示，正常情况下建议二选一，关闭其中一个
	// 1. 侧边栏：在sidebarConfig.ts侧边栏配置把音乐组件enable设为false禁用即可
	// 2. 导航栏：在本配置文件把showInNavbar设为false禁用即可

	// 是否在导航栏显示音乐播放器入口
	showInNavbar: true,

	// 使用方式："meting" 使用 Meting API，"local" 使用本地音乐列表
	mode: "meting",

	// 默认音量 (0-1)
	volume: 0.7,

	// 播放模式：'list'=列表循环, 'one'=单曲循环, 'random'=随机播放
	playMode: "list",

	// 是否显启用歌词
	showLyrics: true,

	// Meting API 配置
	meting: {
		// Meting API 地址
		// 默认使用官方 API，也可以使用自定义 API
		api: "https://api.moeyao.cn/meting/?server=:server&type=:type&id=:id",
		// 音乐平台：netease=网易云音乐, tencent=QQ音乐, kugou=酷狗音乐, xiami=虾米音乐, baidu=百度音乐
		server: "tencent",
		// 类型：song=单曲, playlist=歌单, album=专辑, search=搜索, artist=艺术家
		type: "playlist",
		// 歌单/专辑/单曲 ID 或搜索关键词
		id: "9670690724",
		// 认证 token（可选）
		auth: "RK=nddQlD3usA; ptcz=f23739e7136f7630a2aae8bd6a0c1450aaff5926123906b06c26334c5bbfc5bd; pac_uid=0_H3hbn0kFcabHn; omgid=0_H3hbn0kFcabHn; _qimei_uuid42=199190b39151009c04b1edc8c1edb8f16f76fe1f43; _qimei_q36=; yyb_muid=10980E354B476BC224D4183D4A1F6A60; pgv_pvid=7297299168; eas_sid=i1X7b6F162G822f2h5u8X7L513; _qimei_i_3=62cc5a8b9d5956dbc6c3a865088722e9f5bfa3f2130d00d6b58b7a5a70c22868336161973989e2ba88fd; _qimei_i_1=70d250c1d25b; _qimei_h38=9f15e0cc04b1edc8c1edb8f103000003f19919; ts_uid=9420033528; fqm_pvqid=dee38eca-b116-4174-8ebd-92a9ea371d64; _qimei_fingerprint=42ed937c46372e22d9bee1262f21cddc; _clck=1gu61h4|1|g4c|0; ptui_loginuin=2457331233; fqm_sessionid=22a1ecda-fe3d-4184-96be-ce44f5d6de3e; pgv_info=ssid=s7611972232; ts_refer=www.bing.com/; login_type=1; psrf_qqrefresh_token=7AD07CAA8FE909A6152620A4D7FFEE44; euin=owvk7ioioK-ioz**; tmeLoginType=2; qm_keyst=Q_H_L_63k3Nez86f83lnJZE6CXFMpyyqJj0my1t_uF5FDTfGAqLTQIYbEw0Y6hz7lGRjyphUKRki9WhYuoCm5Y9b14k3FAWBxOOFQ; uin=2457331233; psrf_qqopenid=7F885C9CE60731AB3017C19F7C4C63BD; music_ignore_pskey=202306271436Hn@vBj; qqmusic_key=Q_H_L_63k3Nez86f83lnJZE6CXFMpyyqJj0my1t_uF5FDTfGAqLTQIYbEw0Y6hz7lGRjyphUKRki9WhYuoCm5Y9b14k3FAWBxOOFQ; wxunionid=; psrf_musickey_createtime=1773972046; psrf_qqunionid=03FD450083300AD72C67EFCA74B22A9A; wxrefresh_token=; psrf_access_token_expiresAt=1779156046; psrf_qqaccess_token=2CD2B86861B440E1BD245B20D1A47BE4; wxopenid=; ts_last=y.qq.com/n/ryqq_v2/profile",
		// 备用 API 配置（当主 API 失败时使用）
		fallbackApis: [
			"https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
			"https://api.injahow.cn/meting/?server=:server&type=:type&id=:id",
			"https://api.moeyao.cn/meting/?server=:server&type=:type&id=:id",
			"https://met.api.xiaoguan.fit/docs/server=:server&type=:type&id=:id&r=:r",
		],
	},

	// 本地音乐配置（当 mode 为 'local' 时使用）
	// 1. 支持传入歌词文件的路径
	// lrc: "/assets/music/lrc/使一颗心免于哀伤-哼唱.lrc",
	// 2. 或者直接填入歌词字符串内容
	// lrc: "[00:00.00]歌词内容...",
	local: {
		playlist: [
			{
				name: "使一颗心免于哀伤",
				artist: "知更鸟 / HOYO-MiX / Chevy",
				url: "/assets/music/使一颗心免于哀伤-哼唱.mp3",
				cover: "/assets/music/cover/109951169585655912.webp",
				lrc: "",
			},
		],
	},
};
