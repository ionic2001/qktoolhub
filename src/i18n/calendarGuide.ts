export interface CalendarGuideSection {
  title: string;
  body: string;
}

export interface CalendarGuideStructure {
  title: string;
  description: string;
  sections: CalendarGuideSection[];
}

export const calendarGuide: Record<'ko' | 'en' | 'ja' | 'zh' | 'es', CalendarGuideStructure> = {
  ko: {
    title: "2026년 달력 & 전 세계 공휴일·영업일 계산기",
    description: "Time.is 스타일의 깔끔한 연간 달력. 대한민국 법정 대체공휴일, 미국·일본 등 25개국 공휴일 다중 선택, 주차(W) 확인, 순수 영업일 계산기, 음력 및 손 없는 날, 캘린더 .ics 다운로드를 무료로 이용하세요.",
    sections: [
      {
        title: "1년 12개월 연간 조망 & ISO 주차(Week Number)",
        body: "Time.is의 미니멀리즘 감성을 담아 1년 전체 일정을 한 화면에서 직관적으로 조망할 수 있습니다. 각 주 왼쪽에는 글로벌 비즈니스와 스프린트 관리에 필수적인 ISO 8601 기준 주차 번호(W1~W52/W53)가 표시됩니다. 오늘 날짜는 눈에 띄는 포인트 링으로 강조되며, 날짜를 클릭하면 올해의 N번째 날, 잔여 일수, D-Day 정보를 즉시 확인할 수 있습니다."
      },
      {
        title: "25개국 공휴일 다중 선택(Multi-Select) 오버레이",
        body: "사용자의 언어 환경(한국어=한국, 영어=미국, 일본어=일본 등)에 맞춰 기본 공휴일이 자동 적용됩니다. 상단의 '국가 선택' 메뉴를 통해 미국, 일본, 영국, 독일, 중국, 베트남 등 전 세계 25개국 공휴일을 체크박스로 자유롭게 추가할 수 있습니다. 복수 국가를 선택하면 달력 셀에 각 나라의 국기와 고유 색상 배지가 동시에 표시되어 글로벌 팀 협업이나 해외 일정 계획에 최적화되어 있습니다."
      },
      {
        title: "대한민국 법정 대체공휴일(대통령령 최신판) 완벽 적용",
        body: "관공서의 공휴일에 관한 규정(대통령령) 최신 개정판을 완벽히 준수합니다. 3·1절, 어린이날, 부처님오신날, 광복절, 개천절, 한글날, 성탄절이 주말과 겹칠 경우 다음 첫 비공휴일(월요일)로 대체되며, 설날·추석 연휴 중 일요일이나 다른 공휴일이 겹칠 경우 연휴 직후 첫 비공휴일이 대체공휴일로 자동 지정됩니다. (신정과 현충일은 법률 규정에 따라 제외)"
      },
      {
        title: "글로벌 순수 영업일(Business Days) & D-Day 계산기",
        body: "시작일과 종료일을 지정하면 주말(토·일)과 사용자가 선택한 국가들의 법정 공휴일을 자동으로 차감하여 실질적인 순수 영업일수(Working Days)를 정밀 계산합니다. 해외 거래, 통관, 금융 결제, 프로젝트 납기일 산출에 매우 유용합니다. 또한 목표일까지 남은 일수를 카운트하는 D-Day 및 날짜 더하기/빼기 도구를 함께 제공합니다."
      },
      {
        title: "표준 .ics 캘린더 파일 내보내기 & A4 깔끔 인쇄",
        body: "선택한 국가의 연간 공휴일 데이터를 Google Calendar, Apple Calendar, Microsoft Outlook 등 전 세계 캘린더 프로그램에 원클릭으로 등록할 수 있는 표준 .ics 파일을 즉시 생성하여 다운로드할 수 있습니다. 인쇄 버튼을 누르면 웹 UI 요소를 자동으로 숨기고 A4 용지에 완벽히 맞춘 고해상도 달력으로 출력됩니다."
      }
    ]
  },
  en: {
    title: "Calendar & Global Holidays, Business Days Calculator",
    description: "Minimalist yearly calendar inspired by Time.is. Multi-select public holidays across 25 countries, ISO week numbers, working business days calculator, and .ics export.",
    sections: [
      {
        title: "Full Year Minimalist Grid & ISO Week Numbers",
        body: "Enjoy an uncluttered, high-productivity full year calendar view inspired by Time.is. Each week features standard ISO 8601 week numbers (W1 to W52/53) vital for enterprise roadmaps and sprint planning. Today is highlighted with an accent ring, and clicking any date displays the day-of-year, remaining days, and instant D-Day count."
      },
      {
        title: "25-Country Holiday Multi-Select Overlay",
        body: "Holidays default to your active language locale (e.g. US for English, KR for Korean, JP for Japanese). Open the Country Selector to overlay statutory holidays from 25 major countries including the US, UK, Japan, Germany, China, and Australia. Multiple countries render side-by-side with national flags and color-coded badges."
      },
      {
        title: "Official Observed / Substitute Holidays",
        body: "Includes rigorous statutory observance rules (such as US Federal holidays observed on Monday/Friday when falling on weekends, and South Korea's Presidential Decree substitute holidays for national holidays and lunar festivals)."
      },
      {
        title: "Net Business Working Days & D-Day Toolkit",
        body: "Calculate true working business days between two dates by automatically excluding weekends and selected statutory holidays. Perfect for cross-border logistics, financial settlements, SLA deadlines, and contract milestones."
      },
      {
        title: ".ics Calendar Export & Clean A4 Print",
        body: "Export all selected public holidays as a standard RFC 5545 .ics file to import directly into Google Calendar, Apple Calendar, or Outlook in one click. Use the Print button to print a crisp A4 paper calendar with clutter-free @media print styles."
      }
    ]
  },
  ja: {
    title: "年間カレンダー & 世界25カ国の祝日・営業日計算機",
    description: "Time.isスタイルのミニマルな年間カレンダー。日本・米国・韓国など25カ国の祝日複数選択、週番号(W)、実働営業日計算機、振替休日、.icsエクスポートを無料提供。",
    sections: [
      {
        title: "年間12ヶ月の一覧表示とISO週番号(Week Number)",
        body: "Time.isの洗練されたミニマリズムを継承し、1年全体のカレンダーを一画面で快適に俯瞰できます。各行には業務進行やスプリント管理に必須のISO 8601週番号(W1〜W52)を完備。日付をクリックすると、今年通算の何日目か、残り日数、D-Dayが即座にポップアップします。"
      },
      {
        title: "世界25カ国の祝日複数選択 (Multi-Select) 機能",
        body: "選択言語に合わせて標準の祝日国が設定されます。上部の国選択ボタンから、日本・アメリカ・韓国・イギリス・ドイツ・中国など25カ国の祝日を自由に複数チェック可能。複数国を選択すると、国旗アイコンとカラータグで同時にカレンダー上に重層表示されます。"
      },
      {
        title: "振替休日・ハッピーマンデーの自動計算",
        body: "祝日が日曜日に重なった場合の月曜振替休日や、各国の公的振替規則（米国の観測日、韓国の代替休日規定など）を忠実に反映しています。"
      },
      {
        title: "実働営業日 (Business Days) & D-Day計算ツール",
        body: "開始日と終了日を選ぶだけで、土日週末および選択した国々の公的祝日を自動控除し、純粋な実働ビジネス営業日数を算出。海外取引、貿易納期、受発注管理に最適です。"
      },
      {
        title: ".ics カレンダー出力 & A4プリント最適化",
        body: "選択した国の祝日をGoogleカレンダー、Appleカレンダー、Outlookにワンクリックで登録できる標準.ics形式でダウンロード可能。A4印刷ボタンを押せば、WEBヘッダーを排した美しい紙面用レイアウトで印刷できます。"
      }
    ]
  },
  zh: {
    title: "智能全年日历 & 全球法定节假日·工作日计算器",
    description: "极简Time.is风格年历。支持中国、美国、日韩等25国节假日多选叠加，ISO周数，纯工作日计算，调休补休规则，一键导出.ics日历。",
    sections: [
      {
        title: "12个月全景视图与国际标准周数(ISO Week)",
        body: "传承Time.is极简设计，一屏总览全年12个月。每行左侧标有全球商业与敏捷项目必备的ISO 8601标准周数(W1~W52)。今日日期高亮突出，点击任意日期可查看当天在当年的天数序号、剩余天数及倒数日。"
      },
      {
        title: "25国法定节假日多选叠加 (Multi-Select)",
        body: "根据界面语言自动匹配默认国家（中文默认为中国）。点击国家选择器可自由勾选美国、英国、日本、德国、新加坡等25个主要国家。多选时将在日历格中同时显示各国国旗与彩色标签，跨国商务排期一目了然。"
      },
      {
        title: "法定调休与补休规则精准匹配",
        body: "完整支持主要国家的法定节假日顺延与调休补休算法（如周末逢节假日顺延、韩国总统令代替公休日、欧美复活节浮动假期等）。"
      },
      {
        title: "纯工作日 (Business Days) 与 D-Day 计算器",
        body: "输入起始与截止日期，系统将自动扣除周末双休以及所选国家的所有法定公休日，精准得出实际工作日天数。非常适合跨境贸易交期、国际汇兑与项目里程碑跟踪。"
      },
      {
        title: "导出 .ics 标准日历 & A4 纸张优雅打印",
        body: "支持将选中公休节假日导出为标准RFC 5545 .ics日历订阅文件，一键同步至Google Calendar、苹果日历或Outlook。支持@media print专属打印样式，轻松输出干净的A4纸质年历。"
      }
    ]
  },
  es: {
    title: "Calendario Anual y Días Festivos Mundiales, Días Hábiles",
    description: "Calendario anual minimalista estilo Time.is. Festivos de 25 países con selección múltiple, números de semana ISO, calculadora de días laborables netos y exportación .ics.",
    sections: [
      {
        title: "Cuadrícula Anual Completa y Semanas ISO 8601",
        body: "Visualización anual limpia y minimalista inspirada en Time.is. Cada semana incluye números de semana estándar ISO (W1 a W52/53). El día actual se resalta con un círculo de color y al pulsar una fecha se muestra el día del año y contador D-Day."
      },
      {
        title: "Superposición de Festivos de 25 Países (Múltiple)",
        body: "Se configuran por defecto los festivos según tu idioma. Abre el selector para añadir días festivos de 25 países (España, EE. UU., México, Argentina, etc.). Cada festivo se muestra con su bandera y etiqueta distintiva."
      },
      {
        title: "Cálculo de Festivos Trasladados y Sustitutos",
        body: "Aplica de forma precisa las reglas oficiales de días festivos observados o sustitutos cuando coinciden con domingos o fines de semana."
      },
      {
        title: "Calculadora de Días Hábiles Netos y D-Day",
        body: "Calcula los días laborables reales entre dos fechas descontando automáticamente los fines de semana y los festivos de los países seleccionados."
      },
      {
        title: "Exportación .ics y Optimización para Imprimir en A4",
        body: "Descarga los festivos en formato estándar .ics para Google Calendar o Apple Calendar. Pulsa Imprimir para obtener un diseño nítido en formato A4."
      }
    ]
  }
};
