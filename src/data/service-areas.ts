/**
 * Bilingual service-area content for /service-area.
 *
 * Both English and Chinese copy are rendered server-side so search engines
 * can index the Tri-Cities terms (Coquitlam, Port Coquitlam, Port Moody)
 * and the Chinese equivalents (高贵林、高貴林港、满地宝).
 */

export interface ServiceAreaSection {
  city: string;
  cityZh: string;
  headline: string;
  headlineZh: string;
  body: string;
  bodyZh: string;
  points: string[];
  pointsZh: string[];
  commute: string;
  commuteZh: string;
}

export interface ServiceAreaFaq {
  question: string;
  answer: string;
  questionZh: string;
  answerZh: string;
}

export const serviceAreaIntro = {
  kicker: "Service Area",
  kickerZh: "服务区域",
  title: "Daycare for Tri-Cities Families",
  titleZh: "为 Tri-Cities 家庭提供的日托服务",
  lead:
    "Friendship Corner Daycare is a licensed, non-profit Montessori daycare at 2950 Dewdney Trunk Road in Coquitlam — minutes from the Port Coquitlam and Port Moody borders. We serve families across Coquitlam, Port Coquitlam, and Port Moody with full-day, year-round care for children 30 months to 5 years, bilingual English & Mandarin care, and government childcare subsidies.",
  leadZh:
    "友谊角托儿所（Friendship Corner Daycare）是一家持牌、非营利的蒙特梭利日托中心，位于高贵林 2950 Dewdney Trunk Road，紧邻高貴林港和满地宝，方便 Tri-Cities 家庭接送。我们为 30 个月至 5 岁的孩子提供全年全日制托育，采用英中双语照顾，并接受 BC 省政府的托儿补贴。",
  chips: [
    "Coquitlam · 高贵林",
    "Port Coquitlam · 高貴林港",
    "Port Moody · 满地宝",
  ],
} as const;

export const serviceAreaSections: ServiceAreaSection[] = [
  {
    city: "Port Coquitlam",
    cityZh: "高貴林港",
    headline: "Port Coquitlam parents: full-day care that fits your workday",
    headlineZh: "高貴林港家长：全日制托育，和你的工作时间完全合拍",
    body:
      "Located minutes from the Coquitlam–Port Coquitlam border, Friendship Corner is an easy stop for families coming from downtown PoCo or along the West Coast Express route. Where many local preschool options are part-day and follow the school calendar, our licensed group daycare runs full days, year-round, Monday to Friday — so your schedule and your child's routine stay simple.",
    bodyZh:
      "我们距离高贵林与高貴林港交界只有几分钟车程，无论是从高貴林港市中心还是西岸快线（West Coast Express）沿线过来都很方便。本地很多学前班只提供半日制、且按学校校历放假；而我们持牌的集体日托每周一至周五、全年提供全日制照顾，让您的工作安排和孩子的作息都更简单。",
    points: [
      "7:00 AM – 6:00 PM, full-day care that matches working parents' hours",
      "Children 30 months to 5 years in toddler, preschool, and pre-K programs",
      "BC Affordable Child Care Benefit and $10-a-Day spaces accepted where available",
      "Authentic Montessori materials with bilingual English & Mandarin educators",
    ],
    pointsZh: [
      "上午 7:00 至下午 6:00，配合上班家长的作息",
      "招收 30 个月至 5 岁儿童，分幼儿、学前班与学前准备班",
      "接受 BC 省可负担托儿补贴（ACCB），视名额参与 $10-a-Day 计划",
      "正宗蒙特梭利教具，配英中双语持证教师",
    ],
    commute:
      "About a 10–15 minute drive from most of Port Coquitlam (via Highway 7B / Coast Meridian), with parking at the centre for drop-off and pick-up.",
    commuteZh:
      "从高貴林港大部分区域开车约 10–15 分钟（经 7B 号公路或 Coast Meridian），中心门口有停车位，接送方便。",
  },
  {
    city: "Port Moody",
    cityZh: "满地宝",
    headline: "Port Moody parents: Montessori close to the Barnet Highway corridor",
    headlineZh: "满地宝家长：紧邻 Barnet 高速公路走廊的蒙特梭利日托",
    body:
      "For families in Port Moody — from Moody Centre to Newport Village — Friendship Corner is a practical choice for parents who commute toward Coquitlam or Vancouver. Your child gets a structured Montessori morning, outdoor play, and afternoon enrichment while you stay on schedule, with no part-day pickup to juggle.",
    bodyZh:
      "无论您住在满地宝的 Moody Centre 还是 Newport Village，友谊角都是来往高贵林或温哥华通勤家庭的实用选择。孩子上午进行有体系的蒙特梭利工作，加上户外活动与下午的丰富课程，您无需为半日接送来回奔波。",
    points: [
      "Bilingual English & Mandarin environment that supports early language development",
      "Small 1:8 staff-to-child ratio with certified BC ECE educators",
      "Yoga, movement, hands-on science, art, and music included in weekly programming",
      "Kindergarten-ready pre-K focus for children turning 5",
    ],
    pointsZh: [
      "英中双语环境，促进早期语言发展",
      "1:8 师生比，持证 BC 幼儿教育（ECE）教师",
      "每周课程包含瑜伽、运动、动手科学、艺术与音乐",
      "面向 5 岁儿童的入学准备课程，衔接幼儿园",
    ],
    commute:
      "About a 10–15 minute drive from Moody Centre / Port Moody via Barnet Highway or Ioco Road.",
    commuteZh:
      "从满地宝 Moody Centre 一带经 Barnet 公路或 Ioco 路开车约 10–15 分钟。",
  },
];

export const serviceAreaFaqs: ServiceAreaFaq[] = [
  {
    question: "What ages do you serve?",
    answer:
      "We care for children from 30 months to 5 years in three Montessori programs: toddler (30 months–3), preschool (3–4), and pre-kindergarten (4–5).",
    questionZh: "招收多大年龄的孩子？",
    answerZh:
      "我们招收 30 个月至 5 岁的儿童，分为三个蒙特梭利班级：幼儿班（30个月–3岁）、学前班（3–4岁）和学前准备班（4–5岁）。",
  },
  {
    question: "What are your hours of operation?",
    answer:
      "We are open Monday to Friday, 7:00 AM to 6:00 PM, year-round. We close on statutory holidays and for two weeks during the winter holiday season.",
    questionZh: "你们的营业时间是？",
    answerZh:
      "我们周一至周五、上午 7:00 至下午 6:00 全年开放；法定假日及冬季假期约两周休息。",
  },
  {
    question: "Is your daycare licensed?",
    answer:
      "Yes. We are a licensed BC group daycare regulated under the Community Care and Assisted Living Act, and we maintain a 1:8 staff-to-child ratio with certified ECE and Montessori educators.",
    questionZh: "你们有政府执照吗？",
    answerZh:
      "有。我们是受 BC 省《社区照护与辅助生活法》监管的持牌集体日托，师生比 1:8，教师均持有 ECE 与蒙特梭利认证。",
  },
  {
    question: "Do you accept government childcare subsidies?",
    answer:
      "Yes. We accept the BC Affordable Child Care Benefit and participate in the ChildCareBC $10-a-Day program where funded spaces are available. We can help you understand and apply.",
    questionZh: "接受政府托儿补贴吗？",
    answerZh:
      "接受。我们参与 BC 省可负担托儿补贴（ACCB），并在有名额时参与 ChildCareBC $10-a-Day 计划，可以协助您了解并申请。",
  },
  {
    question: "Is the program really bilingual English & Mandarin?",
    answer:
      "Yes. English is the primary language of instruction, and Mandarin is woven into daily routines, songs, stories, and activities — supporting children from both English- and Chinese-speaking families.",
    questionZh: "真的是英中双语教学吗？",
    answerZh:
      "是的。教学以英语为主，普通话融入日常作息、儿歌、故事和活动中，同时支持英语家庭和中文家庭的孩子。",
  },
  {
    question: "How do I book a tour or join the waitlist?",
    answer:
      "Use the online tour form, call us at 604.945.8504, or email friendship.care@live.ca. There is no fee to join the waitlist, and we will confirm your tour by phone or email.",
    questionZh: "如何预约参观或加入候补名单？",
    answerZh:
      "您可以在线填写参观预约表、致电 604.945.8504，或发送邮件至 friendship.care@live.ca。加入候补名单免费，我们会通过电话或邮件与您确认参观时间。",
  },
];
