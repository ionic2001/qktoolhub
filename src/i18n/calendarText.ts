export interface CalendarTextStructure {
  badge: string;
  title: string;
  subtitle: string;
  tabCalendar: string;
  tabHolidays: string;
  tabCalculator: string;
  today: string;
  yearProgress: string;
  daysPassed: string;
  daysRemaining: string;
  weekNumber: string;
  showWeekNumbers: string;
  showLunar: string;
  sonFreeDay: string;
  selectCountries: string;
  exportIcs: string;
  print: string;
  countriesSelected: string;
  countryModalTitle: string;
  countryModalDesc: string;
  countrySearchPlaceholder: string;
  presetMyLang: string;
  presetMarkets: string;
  clearAll: string;
  close: string;
  // D-Day and Date Math
  ddayTitle: string;
  targetDate: string;
  ddayResultBefore: string;
  ddayResultAfter: string;
  ddayToday: string;
  dateMathTitle: string;
  baseDate: string;
  daysToAdd: string;
  resultDate: string;
  // Business Days
  businessDaysTitle: string;
  startDate: string;
  endDate: string;
  calcWorkingDays: string;
  totalCalendarDays: string;
  weekendDaysCount: string;
  holidayDaysCount: string;
  netWorkingDays: string;
  businessDaysHelp: string;
  // Holiday Planner
  goldenHolidayTitle: string;
  goldenHolidayDesc: string;
  bridgeHolidayTip: string;
  substituteHoliday: string;
  totalHolidaysCount: string;
  noHolidaysFound: string;
  // Date detail modal / popup
  dayOfYear: string;
  weekOfYear: string;
  holidaysOnThisDay: string;
  none: string;
  months: string[];
  weekdays: string[];
}

export const calendarText: Record<'ko' | 'en' | 'ja' | 'zh' | 'es', CalendarTextStructure> = {
  ko: {
    badge: "CALENDAR STUDIO",
    title: "스마트 달력 & 글로벌 공휴일 계산기",
    subtitle: "Time.is 감성의 연간 달력과 전 세계 25개국 공휴일 다중 선택, 순수 영업일 및 D-Day 계산기",
    tabCalendar: "📅 연간 달력",
    tabHolidays: "🏖️ 공휴일 & 황금연휴",
    tabCalculator: "⏱️ 날짜 & 영업일 계산기",
    today: "오늘",
    yearProgress: "올해 진행률",
    daysPassed: "일 경과",
    daysRemaining: "일 남음",
    weekNumber: "주차",
    showWeekNumbers: "주차(W) 표시",
    showLunar: "음력·손없는날",
    sonFreeDay: "손 없는 날 (이사 길일)",
    selectCountries: "공휴일 국가 선택",
    exportIcs: ".ics 캘린더 다운로드",
    print: "A4 인쇄",
    countriesSelected: "개국 선택됨",
    countryModalTitle: "공휴일 표시 국가 선택 (다중 선택 가능)",
    countryModalDesc: "여러 국가를 체크하면 달력에 각 국가 국기와 고유 색상 배지로 동시에 표시됩니다.",
    countrySearchPlaceholder: "국가명 또는 코드 검색...",
    presetMyLang: "내 언어 국가",
    presetMarkets: "주요 증시 4개국 (KR, US, JP, GB)",
    clearAll: "모두 해제",
    close: "닫기",
    ddayTitle: "🎯 목표일 D-Day 카운터",
    targetDate: "목표 날짜",
    ddayResultBefore: "일 남았습니다",
    ddayResultAfter: "일 지났습니다",
    ddayToday: "오늘이 바로 D-Day입니다!",
    dateMathTitle: "➕ 날짜 더하기 / 빼기",
    baseDate: "기준일",
    daysToAdd: "더하거나 뺄 일수 (예: +100, -30)",
    resultDate: "계산 결과 날짜",
    businessDaysTitle: "💼 순수 영업일(Business Days) 계산기",
    startDate: "시작일",
    endDate: "종료일",
    calcWorkingDays: "영업일 계산",
    totalCalendarDays: "총 달력 일수",
    weekendDaysCount: "주말(토·일) 일수",
    holidayDaysCount: "공휴일 수 (선택 국가)",
    netWorkingDays: "순수 영업일수",
    businessDaysHelp: "선택된 국가들의 공휴일과 주말을 모두 제외한 실질적인 근무일수를 산출합니다.",
    goldenHolidayTitle: "연간 공휴일 타임라인 & 연차 추천",
    goldenHolidayDesc: "연도별 법정 공휴일과 대체공휴일, 징검다리 황금연휴를 한눈에 확인하세요.",
    bridgeHolidayTip: "연차 꿀팁",
    substituteHoliday: "대체공휴일",
    totalHolidaysCount: "선택 국가 총 공휴일",
    noHolidaysFound: "선택된 국가의 공휴일이 없습니다.",
    dayOfYear: "번째 날",
    weekOfYear: "주차",
    holidaysOnThisDay: "이 날의 공휴일 / 기념일",
    none: "없음",
    months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    weekdays: ["일", "월", "화", "수", "목", "금", "토"]
  },
  en: {
    badge: "CALENDAR STUDIO",
    title: "Smart Calendar & Global Holidays",
    subtitle: "Time.is inspired minimal yearly calendar, 25-country holiday multi-select, business working days & D-Day tools.",
    tabCalendar: "📅 Year View",
    tabHolidays: "🏖️ Holiday Timeline",
    tabCalculator: "⏱️ Date & Business Days",
    today: "Today",
    yearProgress: "Year Progress",
    daysPassed: "days passed",
    daysRemaining: "days left",
    weekNumber: "Week",
    showWeekNumbers: "Show Weeks (W)",
    showLunar: "Lunar / Auspicious",
    sonFreeDay: "Auspicious Moving Day",
    selectCountries: "Select Countries",
    exportIcs: "Export .ics Calendar",
    print: "Print (A4)",
    countriesSelected: "countries selected",
    countryModalTitle: "Select Holiday Countries (Multi-Select)",
    countryModalDesc: "Select multiple countries to overlay their public holidays simultaneously with custom color tags.",
    countrySearchPlaceholder: "Search country or code...",
    presetMyLang: "Default (Language)",
    presetMarkets: "Major Markets (KR, US, JP, GB)",
    clearAll: "Clear All",
    close: "Done",
    ddayTitle: "🎯 Goal D-Day Counter",
    targetDate: "Target Date",
    ddayResultBefore: "days remaining",
    ddayResultAfter: "days passed",
    ddayToday: "Today is the D-Day!",
    dateMathTitle: "➕ Date Add / Subtract",
    baseDate: "Base Date",
    daysToAdd: "Days to Add/Subtract (e.g. +100, -30)",
    resultDate: "Calculated Date",
    businessDaysTitle: "💼 Net Business Working Days Calculator",
    startDate: "Start Date",
    endDate: "End Date",
    calcWorkingDays: "Calculate",
    totalCalendarDays: "Total Calendar Days",
    weekendDaysCount: "Weekend Days",
    holidayDaysCount: "Public Holidays (Selected)",
    netWorkingDays: "Net Business Days",
    businessDaysHelp: "Calculates actual working business days excluding weekends and selected country public holidays.",
    goldenHolidayTitle: "Annual Holiday Timeline & Long Weekends",
    goldenHolidayDesc: "View statutory and substitute holidays, bridge days, and maximize your vacation schedule.",
    bridgeHolidayTip: "Vacation Tip",
    substituteHoliday: "Observed Holiday",
    totalHolidaysCount: "Total Holidays (Selected)",
    noHolidaysFound: "No holidays found for selected countries.",
    dayOfYear: "day of year",
    weekOfYear: "week",
    holidaysOnThisDay: "Holidays on this day",
    none: "None",
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  ja: {
    badge: "CALENDAR STUDIO",
    title: "スマート年間カレンダー & 世界の祝日計算機",
    subtitle: "Time.isスタイルのミニマル年間カレンダー、25カ国の祝日複数選択、営業日・D-Day計算ツール。",
    tabCalendar: "📅 年間カレンダー",
    tabHolidays: "🏖️ 祝日・連休ガイド",
    tabCalculator: "⏱️ 日付・営業日計算",
    today: "今日",
    yearProgress: "今年の進捗率",
    daysPassed: "日経過",
    daysRemaining: "日残り",
    weekNumber: "週目",
    showWeekNumbers: "週番号(W)表示",
    showLunar: "旧暦・吉日",
    sonFreeDay: "引越し吉日",
    selectCountries: "祝日国の選択",
    exportIcs: ".ics カレンダー出力",
    print: "A4印刷",
    countriesSelected: "か国選択中",
    countryModalTitle: "祝日表示国の選択 (複数選択可能)",
    countryModalDesc: "複数国をチェックすると、国旗と専用カラータグで同時にカレンダーに表示されます。",
    countrySearchPlaceholder: "国名またはコードを検索...",
    presetMyLang: "言語の標準国",
    presetMarkets: "主要4市場 (KR, US, JP, GB)",
    clearAll: "すべて解除",
    close: "完了",
    ddayTitle: "🎯 目標日 D-Day カウンター",
    targetDate: "目標日",
    ddayResultBefore: "日残り",
    ddayResultAfter: "日経過",
    ddayToday: "本日がD-Dayです！",
    dateMathTitle: "➕ 日付の加算・減算",
    baseDate: "基準日",
    daysToAdd: "増減日数 (例: +100, -30)",
    resultDate: "計算結果の日付",
    businessDaysTitle: "💼 実働営業日 (Business Days) 計算機",
    startDate: "開始日",
    endDate: "終了日",
    calcWorkingDays: "計算する",
    totalCalendarDays: "カレンダー総日数",
    weekendDaysCount: "週末(土日)日数",
    holidayDaysCount: "祝日数 (選択国)",
    netWorkingDays: "純営業日数",
    businessDaysHelp: "選択した国の祝日および土日を除外した、実際のビジネス営業日数を算出します。",
    goldenHolidayTitle: "年間祝日タイムライン & 連休活用法",
    goldenHolidayDesc: "各国の祝日・振替休日・大型連休の有給推奨日を一目で把握できます。",
    bridgeHolidayTip: "有給おすすめ",
    substituteHoliday: "振替休日",
    totalHolidaysCount: "選択国の総祝日数",
    noHolidaysFound: "選択された国の祝日データはありません。",
    dayOfYear: "日目",
    weekOfYear: "週",
    holidaysOnThisDay: "この日の祝日・記念日",
    none: "なし",
    months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9월", "10月", "11月", "12月"],
    weekdays: ["日", "月", "火", "水", "木", "金", "土"]
  },
  zh: {
    badge: "CALENDAR STUDIO",
    title: "智能日历 & 全球法定节假日计算器",
    subtitle: "Time.is极简年历风格，支持25国节假日多选叠加、工作日及倒数日(D-Day)实用计算。",
    tabCalendar: "📅 全年日历",
    tabHolidays: "🏖️ 节假日与黄金周",
    tabCalculator: "⏱️ 日期与工作日计算",
    today: "今天",
    yearProgress: "年度进度",
    daysPassed: "天已过",
    daysRemaining: "天剩余",
    weekNumber: "周",
    showWeekNumbers: "显示周数(W)",
    showLunar: "农历·吉日",
    sonFreeDay: "搬家吉日",
    selectCountries: "选择节假日国家",
    exportIcs: "导出 .ics 日历",
    print: "A4 打印",
    countriesSelected: "个国家已选",
    countryModalTitle: "选择节假日国家 (支持多选)",
    countryModalDesc: "勾选多个国家后，日历将以国旗图标和专属颜色标签同时标注对应节假日。",
    countrySearchPlaceholder: "搜索国家或代码...",
    presetMyLang: "当前语言国家",
    presetMarkets: "主要金融市场 (KR, US, JP, GB)",
    clearAll: "清除全部",
    close: "完成",
    ddayTitle: "🎯 目标日倒计时 (D-Day)",
    targetDate: "目标日期",
    ddayResultBefore: "天剩余",
    ddayResultAfter: "天已过去",
    ddayToday: "今天就是目标日！",
    dateMathTitle: "➕ 日期推算加减",
    baseDate: "基准日期",
    daysToAdd: "推算天数 (如: +100, -30)",
    resultDate: "计算结果日期",
    businessDaysTitle: "💼 纯工作日 (Business Days) 计算器",
    startDate: "开始日期",
    endDate: "结束日期",
    calcWorkingDays: "计算工作日",
    totalCalendarDays: "总日历天数",
    weekendDaysCount: "周末(周六日)天数",
    holidayDaysCount: "法定节假日天数",
    netWorkingDays: "净工作日天数",
    businessDaysHelp: "自动扣除双休日以及所选国家的法定公休日，精准计算实际商务工作日。",
    goldenHolidayTitle: "年度节假日时间表 & 连休拼假指南",
    goldenHolidayDesc: "一览法定节假日与调休补休，轻松规划请假出行最佳方案。",
    bridgeHolidayTip: "拼假建议",
    substituteHoliday: "补休/调休",
    totalHolidaysCount: "所选国家公休总天数",
    noHolidaysFound: "未找到所选国家的节假日。",
    dayOfYear: "第几天",
    weekOfYear: "第几周",
    holidaysOnThisDay: "当天的节日与纪念日",
    none: "无",
    months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    weekdays: ["日", "一", "二", "三", "四", "五", "六"]
  },
  es: {
    badge: "CALENDAR STUDIO",
    title: "Calendario Inteligente y Días Festivos Mundiales",
    subtitle: "Calendario anual minimalista estilo Time.is, selección múltiple de 25 países, días hábiles y D-Day.",
    tabCalendar: "📅 Vista Anual",
    tabHolidays: "🏖️ Festivos y Puentes",
    tabCalculator: "⏱️ Días Hábiles y D-Day",
    today: "Hoy",
    yearProgress: "Progreso del Año",
    daysPassed: "días pasados",
    daysRemaining: "días restantes",
    weekNumber: "Semana",
    showWeekNumbers: "Ver Semanas (W)",
    showLunar: "Lunar / Favorable",
    sonFreeDay: "Día Favorable",
    selectCountries: "Elegir Países",
    exportIcs: "Descargar .ics",
    print: "Imprimir A4",
    countriesSelected: "países elegidos",
    countryModalTitle: "Seleccionar Países para Festivos (Múltiple)",
    countryModalDesc: "Selecciona varios países para superponer sus días festivos con etiquetas de colores y banderas.",
    countrySearchPlaceholder: "Buscar país o código...",
    presetMyLang: "Por Idioma",
    presetMarkets: "Mercados Clave (KR, US, JP, GB)",
    clearAll: "Deseleccionar",
    close: "Listo",
    ddayTitle: "🎯 Contador D-Day",
    targetDate: "Fecha Objetivo",
    ddayResultBefore: "días restantes",
    ddayResultAfter: "días transcurridos",
    ddayToday: "¡Hoy es el día clave!",
    dateMathTitle: "➕ Sumar / Restar Días",
    baseDate: "Fecha Base",
    daysToAdd: "Días (+100, -30)",
    resultDate: "Fecha Resultante",
    businessDaysTitle: "💼 Calculadora de Días Hábiles Laborales",
    startDate: "Fecha Inicio",
    endDate: "Fecha Fin",
    calcWorkingDays: "Calcular",
    totalCalendarDays: "Días Calendario Totales",
    weekendDaysCount: "Días de Fin de Semana",
    holidayDaysCount: "Días Festivos (Seleccionados)",
    netWorkingDays: "Días Hábiles Netos",
    businessDaysHelp: "Calcula días laborables reales descontando fines de semana y festivos oficiales de los países elegidos.",
    goldenHolidayTitle: "Línea de Festivos y Recomendación de Puentes",
    goldenHolidayDesc: "Consulta festivos oficiales, días sustitutos y los mejores puentes para aprovechar tus vacaciones.",
    bridgeHolidayTip: "Consejo Vacaciones",
    substituteHoliday: "Festivo Observado",
    totalHolidaysCount: "Total Festivos Seleccionados",
    noHolidaysFound: "No hay festivos para los países seleccionados.",
    dayOfYear: "día del año",
    weekOfYear: "semana",
    holidaysOnThisDay: "Festivos en este día",
    none: "Ninguno",
    months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    weekdays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
  }
};
