import type { ParentGuide, McqOption, QuestionHint } from '../types/database';

export interface SeedQuestion {
  question_type: 'mcq' | 'numeric';
  prompt: string;
  latex_formula?: string;
  options?: McqOption[];
  correct_answer: string;
  numeric_tolerance?: number;
  numeric_unit?: string;
  hints: QuestionHint[];
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  points?: number;
}

export interface CurriculumTopicSeed {
  grade: number;
  tier: 'primary' | 'middle' | 'high' | 'lower_secondary' | 'upper_secondary';
  topicTitle: string;
  slug: string;
  topicDescription: string;
  icon: string;
  lessonTitle: string;
  lessonSlug: string;
  contentMarkdown: string;
  summary: string;
  durationMinutes: number;
  parentGuide: ParentGuide;
  questions: SeedQuestion[];
}

export const CURRICULUM_DATA: CurriculumTopicSeed[] = [
  {
    "grade": 6,
    "tier": "middle",
    "topicTitle": "Lực, Khối lượng riêng & Trọng lượng",
    "slug": "lop-6-khoi-luong-rieng-trong-luong",
    "topicDescription": "Công thức tính khối lượng riêng D = m/V, trọng lượng P = 10m và phương pháp đo thể tích bình chia độ.",
    "icon": "Scale",
    "lessonTitle": "Khối lượng riêng và Trọng lượng riêng của vật thể",
    "lessonSlug": "khoi-luong-rieng-va-trong-luong-rieng",
    "contentMarkdown": "# Khối lượng riêng và Trọng lượng\n\n## 1. Khối lượng riêng\nKhối lượng riêng của một chất được xác định bằng khối lượng của một đơn vị thể tích ($1\\,\\text{m}^3$) chất đó:\n$$D = \\frac{m}{V}$$\n\nTrong đó:\n- $D$: Khối lượng riêng (đơn vị: $\\text{kg/m}^3$)\n- $m$: Khối lượng của vật (đơn vị: $\\text{kg}$)\n- $V$: Thể tích của vật (đơn vị: $\\text{m}^3$)\n\n## 2. Trọng lượng và Trọng lượng riêng\nTrọng lượng $P$ là độ lớn lực hút của Trái Đất tác dụng lên vật:\n$$P = 10 \\cdot m$$\n\nTrọng lượng riêng $d$ là trọng lượng của một mét khối chất đó:\n$$d = \\frac{P}{V} = 10 \\cdot D$$ (đơn vị: $\\text{N/m}^3$)",
    "summary": "Khối lượng riêng D = m/V (kg/m3). Trọng lượng P = 10m (N). Trọng lượng riêng d = 10D (N/m3).",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Khối lượng riêng ($D$) là khối lượng của $1\\,\\text{m}^3$ chất đó ($D = m/V$). Trọng lượng ($P$) là độ lớn lực hút Trái Đất tác dụng lên vật ($P = 10m$).",
      "misconceptions": [
        "Nhầm lẫn giữa khối lượng (tính bằng kg) và trọng lượng (lực, tính bằng Newton - N).",
        "Tin rằng 1 kg sắt nặng hơn 1 kg bông."
      ],
      "guiding_questions": [
        "Nếu mẹ có 1 kg sắt và 1 kg bông gòn, vật nào có thể tích lớn hơn và vì sao?",
        "Làm thế nào để đo thể tích của một hòn đá có hình dạng góc cạnh gồ ghề bằng bình chia độ?"
      ],
      "home_experiments": [
        {
          "title": "Đo thể tích hòn sỏi bằng bình chia độ",
          "materials": [
            "1 bình chia độ hoặc cốc đong có vạch ml",
            "Nước sạch",
            "1 hòn sỏi nhỏ"
          ],
          "steps": [
            "Đổ nước vào bình đến mức $V_1 = 150\\,\\text{ml}$.",
            "Thả nhẹ hòn sỏi chìm hoàn toàn vào nước, nước dâng lên mức $V_2 = 195\\,\\text{ml}$.",
            "Tính thể tích hòn sỏi: $V = V_2 - V_1 = 45\\,\\text{ml} = 45\\,\\text{cm}^3$."
          ],
          "expected_outcome": "Học sinh hiểu phương pháp thể tích chiếm chỗ để đo thể tích vật thể hình dạng bất kỳ.",
          "safety_notes": "Thả sỏi nhẹ tay tránh làm vỡ cốc thủy tinh."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Một vật có khối lượng $m = 350\\,\\text{g}$ thì trọng lượng $P$ của nó trên mặt đất xấp xỉ bằng bao nhiêu?",
        "options": [
          {
            "id": "A",
            "text": "35 N"
          },
          {
            "id": "B",
            "text": "3.5 N"
          },
          {
            "id": "C",
            "text": "3500 N"
          },
          {
            "id": "D",
            "text": "0.35 N"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Đổi khối lượng ra kg trước: $350\\,\\text{g} = 0.35\\,\\text{kg}$."
          },
          {
            "level": 2,
            "hint": "Áp dụng công thức liên hệ trọng lượng và khối lượng: $P = 10 \\cdot m$."
          }
        ],
        "explanation": "$m = 350\\,\\text{g} = 0.35\\,\\text{kg} \\implies P = 10 \\cdot m = 10 \\cdot 0.35 = 3.5\\,\\text{N}$."
      },
      {
        "question_type": "numeric",
        "prompt": "Một khối nhôm có thể tích $V = 0.04\\,\\text{m}^3$ và khối lượng riêng của nhôm là $D = 2700\\,\\text{kg/m}^3$. Tính khối lượng $m$ của khối nhôm theo đơn vị $\\text{kg}$.",
        "latex_formula": "m = D \\cdot V",
        "correct_answer": "108",
        "numeric_tolerance": 0.02,
        "numeric_unit": "kg",
        "hints": [
          {
            "level": 1,
            "hint": "Từ công thức $D = \\frac{m}{V}$, suy ra công thức tính khối lượng $m = D \\cdot V$."
          },
          {
            "level": 2,
            "hint": "Thay số: $m = 2700 \\cdot 0.04$."
          }
        ],
        "explanation": "$m = D \\cdot V = 2700 \\cdot 0.04 = 108\\,\\text{kg}$.",
        "difficulty": "medium",
        "points": 10
      },
      {
        "question_type": "mcq",
        "prompt": "Một khối gỗ hình hộp chữ nhật có kích thước dài $20\\,\\text{cm}$, rộng $10\\,\\text{cm}$, cao $5\\,\\text{cm}$. Thể tích $V$ của khối gỗ đó bằng bao nhiêu lít?",
        "options": [
          {
            "id": "A",
            "text": "1 lít"
          },
          {
            "id": "B",
            "text": "10 lít"
          },
          {
            "id": "C",
            "text": "0.1 lít"
          },
          {
            "id": "D",
            "text": "1000 lít"
          }
        ],
        "correct_answer": "A",
        "difficulty": "medium",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Tính thể tích theo cm khối: $V = 20 \\times 10 \\times 5 = 1000\\,\\text{cm}^3$."
          },
          {
            "level": 2,
            "hint": "Quy đổi: $1\\,\\text{lít} = 1\\,\\text{dm}^3 = 1000\\,\\text{cm}^3$."
          }
        ],
        "explanation": "$V = 20 \\times 10 \\times 5 = 1000\\,\\text{cm}^3 = 1\\,\\text{dm}^3 = 1\\,\\text{lít}$."
      },
      {
        "question_type": "numeric",
        "prompt": "Khối lượng riêng của nước là $D = 1000\\,\\text{kg/m}^3$. Tính khối lượng $m$ của $1.5\\,\\text{m}^3$ nước theo đơn vị $\\text{kg}$.",
        "latex_formula": "m = D \\cdot V",
        "correct_answer": "1500",
        "numeric_tolerance": 0.02,
        "numeric_unit": "kg",
        "hints": [
          {
            "level": 1,
            "hint": "Khối lượng được tính theo công thức $m = D \\cdot V$."
          },
          {
            "level": 2,
            "hint": "Tính: $m = 1000 \\cdot 1.5$."
          }
        ],
        "explanation": "$m = 1000 \\cdot 1.5 = 1500\\,\\text{kg}$.",
        "difficulty": "easy",
        "points": 10
      },
      {
        "question_type": "mcq",
        "prompt": "Thả một quả cầu kim loại chìm hoàn toàn vào bình chia độ chứa sẵn $120\\,\\text{cm}^3$ nước thì mực nước dâng lên mức $175\\,\\text{cm}^3$. Thể tích của quả cầu là bao nhiêu?",
        "options": [
          {
            "id": "A",
            "text": "55 cm3"
          },
          {
            "id": "B",
            "text": "295 cm3"
          },
          {
            "id": "C",
            "text": "120 cm3"
          },
          {
            "id": "D",
            "text": "175 cm3"
          }
        ],
        "correct_answer": "A",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Thể tích vật rắn bằng độ tăng thể tích của nước trong bình: $V = V_2 - V_1$."
          }
        ],
        "explanation": "$V = 175 - 120 = 55\\,\\text{cm}^3$."
      },
      {
        "question_type": "numeric",
        "prompt": "Một phi hành gia có trọng lượng trên mặt đất là $P = 600\\,\\text{N}$. Trọng lực trên Mặt Trăng xấp xỉ bằng $1/6$ trên Trái Đất. Tính trọng lượng của phi hành gia đó khi đứng trên Mặt Trăng theo đơn vị $\\text{N}$.",
        "correct_answer": "100",
        "numeric_tolerance": 0.02,
        "numeric_unit": "N",
        "hints": [
          {
            "level": 1,
            "hint": "Trọng lượng trên Mặt Trăng bằng trọng lượng trên Trái Đất chia cho 6."
          }
        ],
        "explanation": "$P_{\\text{MT}} = 600 / 6 = 100\\,\\text{N}$. Khối lượng không đổi nhưng trọng lượng giảm 6 lần.",
        "difficulty": "medium",
        "points": 10
      },
      {
        "question_type": "mcq",
        "prompt": "Đơn vị đo chuẩn của trọng lượng riêng trong hệ thống đo lường quốc tế (SI) là gì?",
        "options": [
          {
            "id": "A",
            "text": "N/m3"
          },
          {
            "id": "B",
            "text": "kg/m3"
          },
          {
            "id": "C",
            "text": "N/m2"
          },
          {
            "id": "D",
            "text": "J/m3"
          }
        ],
        "correct_answer": "A",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Trọng lượng riêng $d = P / V$, trong đó $P$ đo bằng Newton (N), $V$ đo bằng mét khối (m3)."
          }
        ],
        "explanation": "Trọng lượng riêng $d = \\frac{P}{V}$ có đơn vị là $\\text{N/m}^3$."
      },
      {
        "question_type": "numeric",
        "prompt": "Một khối sắt có thể tích $V = 0.02\\,\\text{m}^3$ và khối lượng riêng $D = 7800\\,\\text{kg/m}^3$. Lấy $P = 10 \\cdot m$, tính trọng lượng $P$ của khối sắt theo đơn vị $\\text{N}$.",
        "latex_formula": "P = 10 \\cdot D \\cdot V",
        "correct_answer": "1560",
        "numeric_tolerance": 0.02,
        "numeric_unit": "N",
        "hints": [
          {
            "level": 1,
            "hint": "Tìm khối lượng: $m = D \\cdot V = 7800 \\cdot 0.02 = 156\\,\\text{kg}$."
          },
          {
            "level": 2,
            "hint": "Tính trọng lượng: $P = 10 \\cdot m = 10 \\cdot 156$."
          }
        ],
        "explanation": "$m = 7800 \\cdot 0.02 = 156\\,\\text{kg} \\implies P = 10 \\cdot 156 = 1560\\,\\text{N}$.",
        "difficulty": "hard",
        "points": 15
      }
    ]
  },
  {
    "grade": 7,
    "tier": "middle",
    "topicTitle": "Tốc độ, Chuyển động & Sóng âm",
    "slug": "lop-7-toc-do-chuyen-dong",
    "topicDescription": "Định nghĩa tốc độ v = s/t, chuyển đổi đơn vị km/h sang m/s và đọc đồ thị quãng đường - thời gian.",
    "icon": "Gauge",
    "lessonTitle": "Tốc độ chuyển động và Đồ thị Quãng đường - Thời gian",
    "lessonSlug": "toc-do-chuyen-dong-do-thi",
    "contentMarkdown": "# Tốc độ chuyển động\n\n## 1. Công thức tính tốc độ\nTốc độ là đại lượng đặc trưng cho sự nhanh, chậm của chuyển động:\n$$v = \\frac{s}{t}$$\n\nTrong đó:\n- $v$: Tốc độ chuyển động ($\\text{m/s}$ hoặc $\\text{km/h}$)\n- $s$: Quãng đường đi được ($\\text{m}$ hoặc $\\text{km}$)\n- $t$: Thời gian đi hết quãng đường đó ($\\text{s}$ hoặc $\\text{h}$)\n\n## 2. Quy tắc đổi đơn vị\n$$1\\,\\text{m/s} = 3.6\\,\\text{km/h} \\iff 1\\,\\text{km/h} = \\frac{1}{3.6}\\,\\text{m/s}$$\n\n## 3. Đồ thị Quãng đường - Thời gian ($s-t$)\n- Đường biểu diễn dốc lên: vật chuyển động thẳng đều với tốc độ không đổi.\n- Đường nằm ngang: vật đứng yên ($s$ không đổi theo thời gian).",
    "summary": "Tốc độ v = s/t. Đổi đơn vị: 1 m/s = 3.6 km/h. Đồ thị s-t dốc lên là chuyển động, nằm ngang là đứng yên.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Tốc độ $v = s/t$ cho biết sự nhanh chậm của chuyển động. Đồ thị quãng đường - thời gian dốc lên là chuyển động đều, nằm ngang là vật đứng yên.",
      "misconceptions": [
        "Nhầm lẫn giữa tốc độ tức thời tại 1 thời điểm với tốc độ trung bình trên toàn bộ chuyến đi.",
        "Nghĩ rằng đồ thị s-t nằm ngang nghĩa là vật đang chuyển động thẳng đều."
      ],
      "guiding_questions": [
        "Nếu con đi xe bus từ nhà tới trường dài 6 km hết 20 phút, tốc độ trung bình của xe bus là bao nhiêu km/h?",
        "Khi nhìn vào đồ thị $s-t$, đoạn nào nằm ngang thì người đi xe đang làm gì?"
      ],
      "home_experiments": [
        {
          "title": "Bấm giờ tính tốc độ đi bộ",
          "materials": [
            "1 chiếc thước dây đo cự ly",
            "Điện thoại thông minh có ứng dụng bấm giờ (Stopwatch)"
          ],
          "steps": [
            "Dùng thước đo một đoạn đường thẳng trong hành lang hoặc sân dài $s = 15\\,\\text{m}$.",
            "Con đi bộ bình thường từ vạch xuất phát đến đích, phụ huynh bấm giờ thời gian $t$ (giây).",
            "Tính tốc độ: $v = 15 / t$ (m/s), sau đó nhân 3.6 để ra km/h."
          ],
          "expected_outcome": "Học sinh tự trải nghiệm quá trình thu thập số liệu thực nghiệm và tính tốc độ.",
          "safety_notes": "Đi bộ trong khu vực an toàn, không có chướng ngại vật."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một người đi xe đạp chuyển động thẳng đều trên quãng đường dài $s = 9\\,\\text{km}$ hết thời gian $t = 30\\,\\text{phút}$. Tính tốc độ $v$ của người đó theo đơn vị $\\text{km/h}$.",
        "latex_formula": "v = \\frac{s}{t}",
        "correct_answer": "18",
        "numeric_tolerance": 0.02,
        "numeric_unit": "km/h",
        "hints": [
          {
            "level": 1,
            "hint": "Đổi 30 phút sang đơn vị giờ: $30\\,\\text{phút} = 0.5\\,\\text{h}$."
          },
          {
            "level": 2,
            "hint": "Áp dụng công thức $v = \\frac{s}{t} = \\frac{9}{0.5}$."
          }
        ],
        "explanation": "$t = 30\\,\\text{phút} = 0.5\\,\\text{h} \\implies v = \\frac{s}{t} = \\frac{9}{0.5} = 18\\,\\text{km/h}$.",
        "difficulty": "medium",
        "points": 10
      },
      {
        "question_type": "mcq",
        "prompt": "Đổi tốc độ $v = 15\\,\\text{m/s}$ sang đơn vị $\\text{km/h}$, giá trị tương ứng là:",
        "options": [
          {
            "id": "A",
            "text": "45 km/h"
          },
          {
            "id": "B",
            "text": "54 km/h"
          },
          {
            "id": "C",
            "text": "36 km/h"
          },
          {
            "id": "D",
            "text": "60 km/h"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Quy tắc đổi từ m/s sang km/h: nhân với 3.6."
          }
        ],
        "explanation": "$v = 15 \\cdot 3.6 = 54\\,\\text{km/h}$."
      }
    ]
  },
  {
    "grade": 8,
    "tier": "middle",
    "topicTitle": "Áp suất chất lỏng & Lực đẩy Archimedes",
    "slug": "lop-8-ap-suat-chat-long-archimedes",
    "topicDescription": "Định luật Archimedes FA = d.V, áp suất chất lỏng p = d.h và điều kiện chìm nổi của vật thể.",
    "icon": "Anchor",
    "lessonTitle": "Định luật Archimedes và Điều kiện chìm - nổi",
    "lessonSlug": "dinh-luat-archimedes-chim-noi",
    "contentMarkdown": "# Lực đẩy Archimedes\n\n## 1. Định luật Archimedes\nMột vật nhúng vào chất lỏng bị chất lỏng tác dụng một lực đẩy hướng thẳng đứng từ dưới lên trên, độ lớn của lực này bằng trọng lượng của phần chất lỏng bị vật chiếm chỗ:\n$$F_A = d \\cdot V$$\n\nTrong đó:\n- $F_A$: Lực đẩy Archimedes (đơn vị: $\\text{N}$)\n- $d$: Trọng lượng riêng của chất lỏng (đơn vị: $\\text{N/m}^3$)\n- $V$: Thể tích phần chất lỏng bị vật chiếm chỗ (đơn vị: $\\text{m}^3$)\n\n## 2. Điều kiện chìm - nổi\nSo sánh trọng lực $P$ và lực đẩy Archimedes $F_A$:\n- $F_A < P \\implies$ Vật chìm xuống đáy.\n- $F_A = P \\implies$ Vật lơ lửng trong lòng chất lỏng hoặc nổi thăng bằng trên mặt thoáng.\n- $F_A > P \\implies$ Vật chuyển động nổi lên trên.",
    "summary": "Lực đẩy Archimedes FA = d.V. Vật chìm khi FA < P, lơ lửng/nổi khi FA = P, nổi lên khi FA > P.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Lực đẩy Archimedes $F_A = d \\cdot V$ phụ thuộc vào trọng lượng riêng của chất lỏng và thể tích phần chất lỏng bị chiếm chỗ, không phụ thuộc vào độ sâu khi đã chìm hoàn toàn.",
      "misconceptions": [
        "Nghĩ rằng vật càng lặn sâu xuống đáy hồ thì lực đẩy Archimedes tác dụng lên nó càng tăng lên.",
        "Nhầm thể tích chiếm chỗ $V$ với toàn bộ thể tích của bình chứa nước."
      ],
      "guiding_questions": [
        "Khi con bước xuống bể bơi ngập tới ngực, tại sao con cảm thấy bước đi nhẹ bẫng hơn trên cạn?",
        "Tại sao thợ lặn biển phải đeo đai chì nặng quanh thắt lưng mới lặn sâu xuống được?"
      ],
      "home_experiments": [
        {
          "title": "Kiểm chứng lực nâng của nước bằng dây thun",
          "materials": [
            "1 chai nước suối nhỏ đầy nước (330ml)",
            "1 sợi dây chun cao su dài",
            "1 xô nước sâu"
          ],
          "steps": [
            "Buộc sợi dây chun vào cổ chai nước.",
            "Cầm đầu dây chun nhấc chai nước lên trong không khí, dùng thước đo độ dài dây chun dãn ra ($L_1$).",
            "Hạ từ từ chai nước chìm vào trong xô nước, quan sát độ dài dây chun dãn ($L_2$)."
          ],
          "expected_outcome": "Dây chun co ngắn lại ($L_2 < L_1$) do nước tác dụng lực đẩy $F_A$ từ dưới lên.",
          "safety_notes": "Tránh làm đổ nước ra sàn nhà."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một khối kim loại có thể tích $V = 0.002\\,\\text{m}^3$ được nhúng chìm hoàn toàn trong nước có trọng lượng riêng $d = 10000\\,\\text{N/m}^3$. Tính độ lớn lực đẩy Archimedes $F_A$ tác dụng lên khối kim loại theo đơn vị Newton ($\\text{N}$).",
        "latex_formula": "F_A = d \\cdot V",
        "correct_answer": "20",
        "numeric_tolerance": 0.02,
        "numeric_unit": "N",
        "hints": [
          {
            "level": 1,
            "hint": "Áp dụng định luật Archimedes: $F_A = d \\cdot V$."
          },
          {
            "level": 2,
            "hint": "Thay số: $F_A = 10000 \\cdot 0.002$."
          }
        ],
        "explanation": "$F_A = d \\cdot V = 10000\\,\\text{N/m}^3 \\cdot 0.002\\,\\text{m}^3 = 20\\,\\text{N}$.",
        "difficulty": "medium",
        "points": 10
      },
      {
        "question_type": "mcq",
        "prompt": "Khi một vật nổi thăng bằng trên mặt chất lỏng, mối quan hệ giữa trọng lượng $P$ của vật và lực đẩy Archimedes $F_A$ là:",
        "options": [
          {
            "id": "A",
            "text": "$F_A > P$",
            "latex": "F_A > P"
          },
          {
            "id": "B",
            "text": "$F_A < P$",
            "latex": "F_A < P"
          },
          {
            "id": "C",
            "text": "$F_A = P$",
            "latex": "F_A = P"
          },
          {
            "id": "D",
            "text": "$F_A = 0$",
            "latex": "F_A = 0"
          }
        ],
        "correct_answer": "C",
        "difficulty": "medium",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Khi vật đã nổi thăng bằng (đứng yên), hai lực cùng phương ngược chiều tác dụng lên vật phải triệt tiêu nhau."
          }
        ],
        "explanation": "Khi vật nổi thăng bằng, trọng lực và lực đẩy Archimedes cân bằng nhau, do đó $F_A = P$."
      }
    ]
  },
  {
    "grade": 9,
    "tier": "middle",
    "topicTitle": "Định luật Ohm & Mạch điện một chiều",
    "slug": "lop-9-dinh-luat-ohm-dien-hoc",
    "topicDescription": "Định luật Ohm I = U/R, công thức điện trở tương đương mạch nối tiếp và song song.",
    "icon": "Activity",
    "lessonTitle": "Định luật Ohm cho đoạn mạch và Đoạn mạch nối tiếp, song song",
    "lessonSlug": "dinh-luat-ohm-noi-tiep-song-song",
    "contentMarkdown": "# Điện học và Định luật Ohm\n\n## 1. Định luật Ohm\nCường độ dòng điện chạy qua dây dẫn tỉ lệ thuận với hiệu điện thế đặt vào hai đầu dây và tỉ lệ nghịch với điện trở của dây:\n$$I = \\frac{U}{R} \\iff U = I \\cdot R$$\n\nTrong đó:\n- $I$: Cường độ dòng điện (Ampe - $\\text{A}$)\n- $U$: Hiệu điện thế (Vôn - $\\text{V}$)\n- $R$: Điện trở (Ôm - $\\Omega$)\n\n## 2. Đoạn mạch mắc nối tiếp\n- $I = I_1 = I_2$\n- $U = U_1 + U_2$\n- $R_{td} = R_1 + R_2$\n\n## 3. Đoạn mạch mắc song song\n- $U = U_1 = U_2$\n- $I = I_1 + I_2$\n- $\\frac{1}{R_{td}} = \\frac{1}{R_1} + \\frac{1}{R_2} \\iff R_{td} = \\frac{R_1 R_2}{R_1 + R_2}$",
    "summary": "Định luật Ohm: I = U/R. Nối tiếp: Rtd = R1 + R2. Song song: Rtd = (R1*R2)/(R1+R2).",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Định luật Ohm $I = U/R$ mô tả dòng điện tỉ lệ thuận với hiệu điện thế và tỉ lệ nghịch với điện trở. Đèn trong nhà mắc song song để nếu một bóng cháy thì các bóng khác vẫn sáng.",
      "misconceptions": [
        "Học sinh nghĩ rằng dòng điện đi qua điện trở sẽ bị tiêu hao bớt electron và I giảm dần theo chiều dòng điện.",
        "Nhầm lẫn công thức điện trở tương đương giữa mạch nối tiếp và song song."
      ],
      "guiding_questions": [
        "Tại sao các thiết bị điện và bóng đèn trong nhà lại được mắc song song mà không phải nối tiếp?",
        "Tại sao cầm bút thử điện cắm vào ổ điện thì đèn trong bút sáng nhưng người không bị giật?"
      ],
      "home_experiments": [
        {
          "title": "Mô phỏng mạch đèn pin an toàn",
          "materials": [
            "1 viên pin tiểu 1.5V (AA hoặc AAA)",
            "1 bóng đèn LED nhỏ",
            "2 mẩu dây đồng bọc nhựa gọt 2 đầu"
          ],
          "steps": [
            "Nối cực dương pin vào chân dài của LED.",
            "Nối cực âm pin vào chân ngắn của LED qua dây đồng.",
            "Mạch kín: LED phát sáng. Tháo rời 1 đầu dây (mạch hở): LED tắt."
          ],
          "expected_outcome": "Trẻ hiểu trực quan khái niệm mạch kín (dòng điện chạy qua) và mạch hở.",
          "safety_notes": "Chỉ dùng pin 1.5V tiểu học sinh, TUYỆT ĐỐI KHÔNG làm thí nghiệm với điện lưới gia đình 220V."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Cho hai điện trở $R_1 = 20\\,\\Omega$ và $R_2 = 30\\,\\Omega$ mắc song song với nhau vào hiệu điện thế $U = 12\\,\\text{V}$. Tính điện trở tương đương $R_{td}$ của đoạn mạch theo đơn vị $\\Omega$.",
        "latex_formula": "R_{td} = \\frac{R_1 \\cdot R_2}{R_1 + R_2}",
        "correct_answer": "12",
        "numeric_tolerance": 0.02,
        "numeric_unit": "Ω",
        "hints": [
          {
            "level": 1,
            "hint": "Với mạch mắc song song hai điện trở: $R_{td} = \\frac{R_1 \\cdot R_2}{R_1 + R_2}$."
          },
          {
            "level": 2,
            "hint": "Thay số: $R_{td} = \\frac{20 \\cdot 30}{20 + 30} = \\frac{600}{50}$."
          }
        ],
        "explanation": "$R_{td} = \\frac{R_1 R_2}{R_1 + R_2} = \\frac{20 \\cdot 30}{50} = 12\\,\\Omega$.",
        "difficulty": "medium",
        "points": 10
      },
      {
        "question_type": "mcq",
        "prompt": "Đặt một hiệu điện thế $U = 24\\,\\text{V}$ vào hai đầu điện trở $R = 8\\,\\Omega$. Cường độ dòng điện $I$ chạy qua điện trở là:",
        "options": [
          {
            "id": "A",
            "text": "3 A"
          },
          {
            "id": "B",
            "text": "192 A"
          },
          {
            "id": "C",
            "text": "0.33 A"
          },
          {
            "id": "D",
            "text": "16 A"
          }
        ],
        "correct_answer": "A",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Áp dụng định luật Ohm: $I = \\frac{U}{R}$."
          }
        ],
        "explanation": "Theo định luật Ohm: $I = \\frac{U}{R} = \\frac{24}{8} = 3\\,\\text{A}$."
      }
    ]
  },
  {
    "grade": 10,
    "tier": "high",
    "topicTitle": "Động lực học chất điểm & Các định luật Newton",
    "slug": "lop-10-dong-luc-hoc-dinh-luat-newton",
    "topicDescription": "Ba định luật Newton, chuyển động biến đổi đều, lực ma sát trượt và định luật bảo toàn cơ năng.",
    "icon": "Compass",
    "lessonTitle": "Ba định luật Newton và Định luật bảo toàn năng lượng",
    "lessonSlug": "ba-dinh-luat-newton-bao-toan-nang-luong",
    "contentMarkdown": "# Cơ học cổ điển và Ba định luật Newton\n\n## 1. Định luật I Newton (Quán tính)\nNếu một vật không chịu tác dụng của lực nào hoặc chịu tác dụng của các lực có hợp lực bằng không, thì vật đang đứng yên sẽ tiếp tục đứng yên, đang chuyển động sẽ tiếp tục chuyển động thẳng đều.\n\n## 2. Định luật II Newton\nGia tốc của một vật cùng hướng với lực tác dụng lên vật. Độ lớn của gia tốc tỉ lệ thuận với độ lớn của lực và tỉ lệ nghịch với khối lượng của vật:\n$$\\vec{a} = \\frac{\\vec{F}_{net}}{m} \\iff \\vec{F}_{net} = m \\vec{a}$$\n\nLực ma sát trượt:\n$$F_{mst} = \\mu_t \\cdot N$$\n\n## 3. Định luật III Newton (Tác dụng - Phản tác dụng)\nTrong mọi trường hợp, khi vật $A$ tác dụng lên vật $B$ một lực thì vật $B$ cũng tác dụng lại vật $A$ một lực. Hai lực này là hai lực trực đối:\n$$\\vec{F}_{A \\to B} = -\\vec{F}_{B \\to A}$$",
    "summary": "Ba định luật Newton: Fnet = ma, Fmst = mu*N, F_AB = -F_BA. Cơ năng W = Wd + Wt được bảo toàn.",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Ba định luật Newton là nền móng của cơ học cổ điển. Lực không phải là nguyên nhân duy trì chuyển động mà là nguyên nhân làm thay đổi vận tốc (tạo ra gia tốc a = F/m).",
      "misconceptions": [
        "Vật đang chuyển động theo hướng nào thì bắt buộc phải có lực đẩy tác dụng theo hướng đó.",
        "Nghĩ rằng lực ma sát luôn có hại và cản trở mọi chuyển động."
      ],
      "guiding_questions": [
        "Tại sao khi ô tô phanh gấp, người ngồi trong xe lại bị xô dúi về phía trước?",
        "Nếu mặt đất hoàn toàn trơn nhẵn không có ma sát, con người có thể bước đi được không?"
      ],
      "home_experiments": [
        {
          "title": "Kiểm chứng quán tính với đồng xu và tấm bìa",
          "materials": [
            "1 cốc thủy tinh",
            "1 tấm bìa cứng vuông $8\\times 8\\text{cm}$",
            "1 đồng xu kim loại nặng"
          ],
          "steps": [
            "Đặt tấm bìa lên miệng cốc.",
            "Đặt đồng xu lên trên tấm bìa, ngay trên miệng cốc.",
            "Dùng ngón tay búng thật nhanh và dứt khoát vào mép tấm bìa."
          ],
          "expected_outcome": "Tấm bìa bay đi theo phương ngang, đồng xu rơi thẳng đứng vào trong cốc do quán tính bảo toàn trạng thái đứng yên.",
          "safety_notes": "Búng nhẹ tay vừa đủ lực để tấm bìa bay đi."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một vật có khối lượng $m = 5\\,\\text{kg}$ đang đứng yên trên mặt sàn nằm ngang thì chịu tác dụng của một lực kéo nằm ngang $F = 25\\,\\text{N}$. Hệ số ma sát trượt giữa vật và sàn là $\\mu = 0.2$. Lấy $g = 10\\,\\text{m/s}^2$. Tính gia tốc $a$ của vật theo đơn vị $\\text{m/s}^2$.",
        "latex_formula": "a = \\frac{F - \\mu m g}{m}",
        "correct_answer": "3",
        "numeric_tolerance": 0.02,
        "numeric_unit": "m/s^2",
        "hints": [
          {
            "level": 1,
            "hint": "Tính áp lực $N = P = m \\cdot g$ và lực ma sát trượt: $F_{ms} = \\mu \\cdot N$."
          },
          {
            "level": 2,
            "hint": "Áp dụng định luật II Newton theo phương ngang: $F - F_{ms} = m \\cdot a$."
          },
          {
            "level": 3,
            "hint": "$F_{ms} = 0.2 \\cdot 5 \\cdot 10 = 10\\,\\text{N} \\implies a = \\frac{25 - 10}{5} = 3.0\\,\\text{m/s}^2$."
          }
        ],
        "explanation": "$N = mg = 5 \\cdot 10 = 50\\,\\text{N} \\implies F_{ms} = 0.2 \\cdot 50 = 10\\,\\text{N} \\implies F_{net} = 25 - 10 = 15\\,\\text{N} \\implies a = \\frac{15}{5} = 3\\,\\text{m/s}^2$.",
        "difficulty": "hard",
        "points": 15
      },
      {
        "question_type": "mcq",
        "prompt": "Theo định luật III Newton, cặp lực và phản lực:",
        "options": [
          {
            "id": "A",
            "text": "Cùng tác dụng vào một vật nên triệt tiêu lẫn nhau"
          },
          {
            "id": "B",
            "text": "Tác dụng vào hai vật khác nhau, cùng phương, ngược chiều và cùng độ lớn"
          },
          {
            "id": "C",
            "text": "Xuất hiện không đồng thời"
          },
          {
            "id": "D",
            "text": "Luôn luôn có độ lớn khác nhau"
          }
        ],
        "correct_answer": "B",
        "difficulty": "medium",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Lực và phản lực đặt vào hai vật khác nhau hay cùng một vật?"
          }
        ],
        "explanation": "Lực và phản lực là cặp lực tương tác giữa hai vật: đặt vào hai vật khác nhau, cùng phương, ngược chiều, cùng độ lớn và xuất hiện đồng thời."
      }
    ]
  },
  {
    "grade": 11,
    "tier": "high",
    "topicTitle": "Dao động điều hòa & Sóng cơ học",
    "slug": "lop-11-dao-dong-dieu-hoa-song-co",
    "topicDescription": "Phương trình dao động điều hòa x = A cos(wt+phi), con lắc lò xo, con lắc đơn và truyền sóng cơ.",
    "icon": "Radio",
    "lessonTitle": "Phương trình dao động điều hòa và Con lắc lò xo",
    "lessonSlug": "dao-dong-dieu-hoa-con-lac-lo-xo",
    "contentMarkdown": "# Dao động điều hòa\n\n## 1. Phương trình dao động điều hòa\n$$x = A \\cos(\\omega t + \\varphi)$$\n\nTrong đó:\n- $x$: Li độ của dao động ($\\text{cm}$ hoặc $\\text{m}$)\n- $A$: Biên độ dao động ($A > 0$)\n- $\\omega$: Tần số góc ($\\text{rad/s}$)\n- $(\\omega t + \\varphi)$: Pha dao động tại thời điểm $t$ ($\\text{rad}$)\n- $\\varphi$: Pha ban đầu tại $t = 0$ ($\\text{rad}$)\n\n## 2. Vận tốc và Gia tốc\n$$v = x' = -\\omega A \\sin(\\omega t + \\varphi)$$\n$$a = v' = -\\omega^2 A \\cos(\\omega t + \\varphi) = -\\omega^2 x$$\n\n## 3. Con lắc lò xo\nTần số góc và chu kì của con lắc lò xo treo hoặc nằm ngang:\n$$\\omega = \\sqrt{\\frac{k}{m}} \\implies T = \\frac{2\\pi}{\\omega} = 2\\pi \\sqrt{\\frac{m}{k}}$$",
    "summary": "Dao động điều hòa: x = A cos(wt+phi). Vận tốc v = -wA sin(wt+phi). Con lắc lò xo: T = 2*pi*sqrt(m/k).",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Dao động điều hòa là dao động mà li độ là hàm sin hoặc cosin của thời gian. Chu kì con lắc lò xo $T = 2\\pi\\sqrt{m/k}$ chỉ phụ thuộc khối lượng và độ cứng lò xo, không phụ thuộc biên độ.",
      "misconceptions": [
        "Biên độ dao động càng lớn thì chu kì dao động càng dài.",
        "Tại vị trí cân bằng thì gia tốc của vật đạt giá trị cực đại (thực tế tại VTCB x=0 nên a=0)."
      ],
      "guiding_questions": [
        "Khi con ngồi trên xích đu đung đưa, vị trí nào con thấy mình đạt vận tốc lớn nhất, vị trí nào con tạm dừng?",
        "Tại sao khi một đoàn quân hành quân bước đều qua cầu treo thì lại bị cấm bước đều (hiện tượng cộng hưởng)?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát chu kì con lắc đơn tại gia",
          "materials": [
            "1 sợi chỉ dài 1 mét",
            "1 chùm chìa khóa nhỏ làm vật nặng",
            "Đồng hồ bấm giờ điện thoại"
          ],
          "steps": [
            "Buộc chùm chìa khóa vào sợi chỉ, cố định đầu kia lên móc treo.",
            "Kéo lệch góc nhỏ ($\\approx 10^\\circ$), thả nhẹ không vận tốc đầu.",
            "Bấm giờ 10 dao động toàn phần, chia 10 để tính chu kì $T_1$. Cắt ngắn dây còn 0.25m và đo lại $T_2$."
          ],
          "expected_outcome": "Khi chiều dài giảm 4 lần, chu kì giảm 2 lần ($T \\sim \\sqrt{l}$).",
          "safety_notes": "Treo móc chắc chắn tránh rơi chìa khóa."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một con lắc lò xo có độ cứng $k = 100\\,\\text{N/m}$ gắn với vật nặng có khối lượng $m = 0.25\\,\\text{kg}$. Lấy $\\pi^2 \\approx 10$. Tính chu kì dao động riêng $T$ của con lắc theo đơn vị giây ($\\text{s}$).",
        "latex_formula": "T = 2\\pi \\sqrt{\\frac{m}{k}}",
        "correct_answer": "0.314",
        "numeric_tolerance": 0.05,
        "numeric_unit": "s",
        "hints": [
          {
            "level": 1,
            "hint": "Tần số góc của con lắc lò xo: $\\omega = \\sqrt{\\frac{k}{m}}$."
          },
          {
            "level": 2,
            "hint": "Chu kì dao động: $T = \\frac{2\\pi}{\\omega} = 2\\pi \\sqrt{\\frac{m}{k}}$."
          },
          {
            "level": 3,
            "hint": "$\\omega = \\sqrt{\\frac{100}{0.25}} = \\sqrt{400} = 20\\,\\text{rad/s} \\implies T = \\frac{2\\pi}{20} = \\frac{\\pi}{10} \\approx 0.314\\,\\text{s}$."
          }
        ],
        "explanation": "$\\omega = \\sqrt{100 / 0.25} = 20\\,\\text{rad/s} \\implies T = \\frac{2\\pi}{20} \\approx 0.314\\,\\text{s}$.",
        "difficulty": "hard",
        "points": 15
      },
      {
        "question_type": "mcq",
        "prompt": "Một chất điểm dao động điều hòa theo phương trình $x = 8 \\cos(5\\pi t - \\frac{\\pi}{6})\\,\\text{cm}$. Biên độ dao động $A$ và pha ban đầu $\\varphi$ của dao động lần lượt là:",
        "options": [
          {
            "id": "A",
            "text": "$A = 8\\,\\text{cm},\\; \\varphi = -\\frac{\\pi}{6}\\,\\text{rad}$",
            "latex": "A = 8\\,\\text{cm},\\; \\varphi = -\\frac{\\pi}{6}\\,\\text{rad}"
          },
          {
            "id": "B",
            "text": "$A = 8\\,\\text{cm},\\; \\varphi = 5\\pi\\,\\text{rad}$",
            "latex": "A = 8\\,\\text{cm},\\; \\varphi = 5\\pi\\,\\text{rad}"
          },
          {
            "id": "C",
            "text": "$A = 16\\,\\text{cm},\\; \\varphi = \\frac{\\pi}{6}\\,\\text{rad}$",
            "latex": "A = 16\\,\\text{cm},\\; \\varphi = \\frac{\\pi}{6}\\,\\text{rad}"
          },
          {
            "id": "D",
            "text": "$A = 5\\,\\text{cm},\\; \\varphi = -\\frac{\\pi}{6}\\,\\text{rad}$",
            "latex": "A = 5\\,\\text{cm},\\; \\varphi = -\\frac{\\pi}{6}\\,\\text{rad}"
          }
        ],
        "correct_answer": "A",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Đối chiếu phương trình dao động với dạng tổng quát: $x = A \\cos(\\omega t + \\varphi)$."
          }
        ],
        "explanation": "Đối chiếu dạng chuẩn $x = A \\cos(\\omega t + \\varphi)$, ta có $A = 8\\,\\text{cm}$ và $\\varphi = -\\frac{\\pi}{6}\\,\\text{rad}$."
      }
    ]
  },
  {
    "grade": 12,
    "tier": "high",
    "topicTitle": "Thuyết động học phân tử chất khí & Vật lý Hạt nhân",
    "slug": "lop-12-khi-ly-tuong-vat-ly-hat-nhan",
    "topicDescription": "Phương trình trạng thái khí lý tưởng pV = nRT, các định luật chất khí và năng lượng liên kết hạt nhân.",
    "icon": "Atom",
    "lessonTitle": "Phương trình trạng thái khí lý tưởng và Năng lượng liên kết hạt nhân",
    "lessonSlug": "khi-ly-tuong-nang-luong-hat-nhan",
    "contentMarkdown": "# Khí lý tưởng & Vật lý Hạt nhân\n\n## 1. Phương trình Clapeyron - Mendeleev\n$$p V = n R T = \\frac{m}{M} R T$$\n\nTrong đó:\n- $p$: Áp suất chất khí ($\\text{Pa}$ hoặc $\\text{atm}$)\n- $V$: Thể tích khối khí ($\\text{m}^3$)\n- $T$: Nhiệt độ tuyệt đối theo thang Kelvin ($T = t^\\circ\\text{C} + 273$)\n- $R \\approx 8.31\\,\\text{J/(mol}\\cdot\\text{K)}$: Hằng số khí lý tưởng\n\nQuá trình đẳng tích (Định luật Charles):\n$$\\frac{p_1}{T_1} = \\frac{p_2}{T_2}$$\n\n## 2. Năng lượng liên kết hạt nhân\nĐộ hụt khối lượng:\n$$\\Delta m = [Z m_p + (A - Z) m_n] - m_X$$\n\nHệ thức Einstein về năng lượng:\n$$E = m \\cdot c^2 \\implies E_{lk} = \\Delta m \\cdot c^2$$",
    "summary": "Phương trình pV = nRT. Đẳng tích: p1/T1 = p2/T2. Năng lượng liên kết hạt nhân: Elk = Delta_m * c^2.",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Áp suất, thể tích và nhiệt độ tuyệt đối của khối khí tuân theo pV/T = const. Năng lượng hạt nhân khổng lồ giải phóng nhờ độ hụt khối lượng chuyển hóa thành năng lượng theo hệ thức E = mc^2 của Einstein.",
      "misconceptions": [
        "Nhiệt độ 0 độ C nghĩa là các phân tử khí đã dừng chuyển động nhiệt hoàn toàn (điểm dừng là 0 K = -273.15 độ C).",
        "Nghĩ rằng khối lượng của hạt nhân bằng đúng tổng khối lượng của các proton và neutron riêng lẻ cấu thành nên nó."
      ],
      "guiding_questions": [
        "Tại sao săm lốp xe đạp bơm căng để ngoài trời nắng gắt mùa hè lại dễ bị nổ?",
        "Mặt Trời đã tỏa sáng hàng tỉ năm qua bằng loại phản ứng hạt nhân nào?"
      ],
      "home_experiments": [
        {
          "title": "Quả bóng bàn phồng lại nhờ nhiệt độ",
          "materials": [
            "1 quả bóng bàn bị móp lõm (không bị thủng rách)",
            "1 cốc nước nóng khoảng $80^\\circ\\text{C}$"
          ],
          "steps": [
            "Thả quả bóng bàn móp vào cốc nước nóng.",
            "Quan sát trong 30-60 giây."
          ],
          "expected_outcome": "Không khí bên trong quả bóng nhận nhiệt, nhiệt độ T tăng làm áp suất p tăng, đẩy vỏ bóng phồng căng trở lại hình dạng cầu ban đầu.",
          "safety_notes": "Thao tác với nước nóng cẩn thận tránh bỏng."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một bình kín có dung tích không đổi $V$ chứa lượng khí ở nhiệt độ $t_1 = 27^\\circ\\text{C}$ và áp suất $p_1 = 1.5\\,\\text{atm}$. Đun nóng bình khí đến nhiệt độ $t_2 = 127^\\circ\\text{C}$. Tính áp suất $p_2$ của lượng khí trong bình theo đơn vị $\\text{atm}$.",
        "latex_formula": "p_2 = p_1 \\cdot \\frac{T_2}{T_1}",
        "correct_answer": "2.0",
        "numeric_tolerance": 0.05,
        "numeric_unit": "atm",
        "hints": [
          {
            "level": 1,
            "hint": "Đổi nhiệt độ Celsius sang thang Kelvin: $T = t + 273$."
          },
          {
            "level": 2,
            "hint": "$T_1 = 27 + 273 = 300\\,\\text{K}$; $T_2 = 127 + 273 = 400\\,\\text{K}$."
          },
          {
            "level": 3,
            "hint": "Áp dụng định luật Charles (đẳng tích): $\\frac{p_1}{T_1} = \\frac{p_2}{T_2} \\implies p_2 = 1.5 \\cdot \\frac{400}{300} = 2.0\\,\\text{atm}$."
          }
        ],
        "explanation": "$T_1 = 300\\,\\text{K}, T_2 = 400\\,\\text{K} \\implies p_2 = p_1 \\frac{T_2}{T_1} = 1.5 \\cdot \\frac{400}{300} = 2.0\\,\\text{atm}$.",
        "difficulty": "hard",
        "points": 15
      },
      {
        "question_type": "mcq",
        "prompt": "Hệ thức nổi tiếng của Einstein về mối liên hệ giữa năng lượng $E$ và khối lượng $m$ là:",
        "options": [
          {
            "id": "A",
            "text": "$E = m c^2$",
            "latex": "E = m c^2"
          },
          {
            "id": "B",
            "text": "$E = \\frac{1}{2} m c^2$",
            "latex": "E = \\frac{1}{2} m c^2"
          },
          {
            "id": "C",
            "text": "$E = m c$",
            "latex": "E = m c"
          },
          {
            "id": "D",
            "text": "$E = \\frac{m}{c^2}$",
            "latex": "E = \\frac{m}{c^2}"
          }
        ],
        "correct_answer": "A",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Công thức tương đối tính hẹp của Albert Einstein!"
          }
        ],
        "explanation": "Hệ thức Einstein: $E = m c^2$, trong đó $c \\approx 3 \\cdot 10^8\\,\\text{m/s}$ là tốc độ ánh sáng trong chân không."
      }
    ]
  },
  {
    "grade": 6,
    "tier": "middle",
    "topicTitle": "Đo chiều dài, thể tích và khối lượng",
    "slug": "lop-6-do-luong-vat-ly",
    "topicDescription": "Sử dụng thước kẹp, bình chia độ và cân điện tử để đo các đại lượng cơ bản.",
    "icon": "Ruler",
    "lessonTitle": "Phương pháp đo lường trong Vật lý",
    "lessonSlug": "phuong-phap-do-luong",
    "contentMarkdown": "# Các phép đo lường cơ bản\n\nMọi nghiên cứu vật lý đều bắt đầu từ các phép đo lường chính xác:\n- **Đo chiều dài**: Dùng thước cuộn, thước kẻ, thước kẹp. Đơn vị chuẩn trong hệ SI là mét ($m$).\n- **Đo thể tích chất lỏng và vật rắn không thấm nước**: Dùng bình chia độ hoặc bình tràn. Đơn vị: lít ($L$) hoặc mét khối ($m^3$).\n- **Đo khối lượng**: Dùng cân Rô-béc-van, cân đòn hoặc cân điện tử. Đơn vị: kilôgam ($kg$).\n\nKhi đo cần đặt mắt vuông góc với vạch chia và ước lượng đến nửa độ chia nhỏ nhất để giảm sai số.",
    "summary": "Đo lường là nền tảng của vật lý. Cần chọn dụng cụ đo phù hợp với giới hạn đo và độ chia nhỏ nhất.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Hướng dẫn con kỹ năng thực hành đo lường chuẩn xác, cách đọc vạch chia và hiểu khái niệm sai số thực nghiệm.",
      "misconceptions": [
        "Học sinh thường nhầm lẫn giữa khối lượng (lượng chất tính bằng kg) và trọng lượng (lực hút tính bằng N).",
        "Nghĩ rằng đặt mắt nhìn nghiêng góc vẫn đọc được kết quả chính xác trên bình chia độ."
      ],
      "guiding_questions": [
        "Làm thế nào để đo được thể tích của một hòn đá cuội có hình dạng gồ ghề bằng một chiếc bình chia độ?",
        "Tại sao trên các thước kẻ học sinh luôn ghi rõ giới hạn đo và độ chia nhỏ nhất?"
      ],
      "home_experiments": [
        {
          "title": "Đo thể tích vật gồ ghề bằng bình tràn tự chế",
          "materials": [
            "1 chiếc cốc đầy ắp nước đặt trên đĩa",
            "1 hòn sỏi nhỏ",
            "1 xilanh có vạch ml"
          ],
          "steps": [
            "Đổ nước vào cốc cho đến khi nước mấp mé miệng cốc.",
            "Thả nhẹ hòn sỏi vào cốc, nước tràn ra đĩa hứng bên dưới.",
            "Dùng xilanh hút toàn bộ lượng nước tràn ra để đọc thể tích chính xác của hòn sỏi."
          ],
          "expected_outcome": "Thể tích nước tràn ra đĩa bằng đúng thể tích của hòn sỏi thả vào cốc.",
          "safety_notes": "Lau khô mặt bàn sau khi làm thí nghiệm với nước."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Đơn vị đo khối lượng chuẩn trong hệ thống đo lường quốc tế (SI) là gì?",
        "options": [
          {
            "id": "A",
            "text": "Gam (g)"
          },
          {
            "id": "B",
            "text": "Kilôgam (kg)"
          },
          {
            "id": "C",
            "text": "Tấn (t)"
          },
          {
            "id": "D",
            "text": "Miligam (mg)"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Ký hiệu là kg, là đơn vị cơ bản trong hệ đơn vị quốc tế SI."
          }
        ],
        "explanation": "Kilôgam (kg) là đơn vị đo khối lượng cơ bản trong hệ đo lường quốc tế SI."
      },
      {
        "question_type": "mcq",
        "prompt": "Giới hạn đo (GHĐ) của một dụng cụ đo là gì?",
        "options": [
          {
            "id": "A",
            "text": "Độ dài giữa hai vạch chia liên tiếp trên thang đo"
          },
          {
            "id": "B",
            "text": "Giá trị lớn nhất ghi trên thang đo của dụng cụ"
          },
          {
            "id": "C",
            "text": "Khoảng cách nhỏ nhất mà dụng cụ có thể phân biệt được"
          },
          {
            "id": "D",
            "text": "Sai số cho phép khi sử dụng dụng cụ đo"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Giới hạn đo là số đo cực đại mà dụng cụ có thể đo được một lần."
          }
        ],
        "explanation": "Giới hạn đo (GHĐ) của một dụng cụ là giá trị lớn nhất ghi trên thang đo của dụng cụ đó."
      },
      {
        "question_type": "numeric",
        "prompt": "Để đo độ dày của một tờ giấy A4, bạn Minh xếp chồng 200 tờ giấy khít lên nhau rồi dùng thước đo được tổng độ dày là $24\\,\\text{mm}$. Tính độ dày của một tờ giấy theo đơn vị $\\text{mm}$.",
        "correct_answer": "0.12",
        "numeric_tolerance": 0.02,
        "numeric_unit": "mm",
        "hints": [
          {
            "level": 1,
            "hint": "Lấy tổng độ dày của cả tệp giấy chia cho số lượng tờ giấy: $24 / 200$."
          }
        ],
        "explanation": "Độ dày một tờ giấy: $d = 24 / 200 = 0.12\\,\\text{mm}$. Phương pháp chia đều giúp đo chính xác các kích thước siêu nhỏ.",
        "difficulty": "medium",
        "points": 10
      },
      {
        "question_type": "mcq",
        "prompt": "Khi đọc thể tích chất lỏng trong bình chia độ hình trụ, vị trí đặt mắt đúng nhất là:",
        "options": [
          {
            "id": "A",
            "text": "Nhìn chéo từ trên xuống dưới mặt thoáng chất lỏng"
          },
          {
            "id": "B",
            "text": "Nhìn chéo từ dưới đáy bình hướng lên"
          },
          {
            "id": "C",
            "text": "Đặt mắt ngang bằng với đáy mặt khum của chất lỏng"
          },
          {
            "id": "D",
            "text": "Nhìn nghiêng 45 độ so với thành bình"
          }
        ],
        "correct_answer": "C",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Mắt phải nằm ngang bằng mặt khum thấp nhất của chất lỏng để tránh sai số góc nhìn."
          }
        ],
        "explanation": "Cần đặt mắt nhìn ngang bằng với đáy mặt khum của chất lỏng để đọc vạch chia chính xác."
      },
      {
        "question_type": "numeric",
        "prompt": "Một bể cá gia đình chứa được $3.5\\,\\text{m}^3$ nước. Đổi thể tích này sang đơn vị lít ($\\text{L}$), biết $1\\,\\text{m}^3 = 1000\\,\\text{L}$.",
        "correct_answer": "3500",
        "numeric_tolerance": 0.02,
        "numeric_unit": "L",
        "hints": [
          {
            "level": 1,
            "hint": "Nhân thể tích với 1000: $3.5 \\times 1000$."
          }
        ],
        "explanation": "$V = 3.5 \\times 1000 = 3500\\,\\text{L}$.",
        "difficulty": "easy",
        "points": 10
      },
      {
        "question_type": "numeric",
        "prompt": "Một bao gạo lớn ghi khối lượng $2.5\\,\\text{tạ}$. Quy đổi khối lượng bao gạo sang đơn vị kilôgam ($\\text{kg}$), biết $1\\,\\text{tạ} = 100\\,\\text{kg}$.",
        "correct_answer": "250",
        "numeric_tolerance": 0.02,
        "numeric_unit": "kg",
        "hints": [
          {
            "level": 1,
            "hint": "Lấy $2.5 \\times 100$."
          }
        ],
        "explanation": "$m = 2.5 \\times 100 = 250\\,\\text{kg}$.",
        "difficulty": "easy",
        "points": 10
      },
      {
        "question_type": "mcq",
        "prompt": "Thước đo có độ chia nhỏ nhất (ĐCNN) là $0.5\\,\\text{cm}$. Cách ghi kết quả đo nào sau đây là ĐÚNG quy tắc?",
        "options": [
          {
            "id": "A",
            "text": "12.3 cm"
          },
          {
            "id": "B",
            "text": "12.5 cm"
          },
          {
            "id": "C",
            "text": "12.35 cm"
          },
          {
            "id": "D",
            "text": "12.4 cm"
          }
        ],
        "correct_answer": "B",
        "difficulty": "medium",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Kết quả đo phải là bội số của độ chia nhỏ nhất (ở đây tận cùng là .0 hoặc .5)."
          }
        ],
        "explanation": "Vì ĐCNN là 0.5 cm nên kết quả ghi phải chia hết cho 0.5 cm, chỉ có 12.5 cm là hợp lệ."
      }
    ]
  },
  {
    "grade": 6,
    "tier": "middle",
    "topicTitle": "Lực tiếp xúc và lực không tiếp xúc",
    "slug": "lop-6-luc-tiep-xuc-khong-tiep-xuc",
    "topicDescription": "Phân loại các lực trong tự nhiên: lực đẩy/kéo tiếp xúc, lực đàn hồi, lực hút hấp dẫn và lực từ.",
    "icon": "Maximize2",
    "lessonTitle": "Thế giới của các loại lực",
    "lessonSlug": "the-gioi-cac-loai-luc",
    "contentMarkdown": "# Phân loại lực trong tự nhiên\n\nLực là tác dụng đẩy hoặc kéo của vật này lên vật khác, làm biến đổi chuyển động hoặc biến dạng vật:\n- **Lực tiếp xúc**: Chỉ xuất hiện khi hai vật tiếp xúc chạm vào nhau (ví dụ: chân sút vào bóng, tay kéo lò xo dãn, lực ma sát giữa lốp xe và mặt đường).\n- **Lực không tiếp xúc**: Xuất hiện ngay cả khi hai vật ở cách xa nhau một khoảng không gian (ví dụ: lực hút của Trái Đất kéo quả táo rơi, lực từ giữa hai cực nam châm hút hoặc đẩy nhau từ xa).",
    "summary": "Lực tiếp xúc cần có sự chạm nhau giữa các vật; lực không tiếp xúc tác dụng qua không gian như trọng lực, lực từ.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Giúp học sinh hình thành tư duy phân loại tương tác cơ học và làm quen với khái niệm trường lực (trường hấp dẫn, từ trường).",
      "misconceptions": [
        "Học sinh nghĩ rằng để tác dụng lực lên vật thì bắt buộc hai vật phải chạm vào nhau.",
        "Học sinh nghĩ lực đàn hồi của lò xo là lực không tiếp xúc."
      ],
      "guiding_questions": [
        "Khi mẹ đưa thanh nam châm lại gần chiếc ghim sắt mà chưa chạm vào, tại sao chiếc ghim vẫn bị hút bay tới?",
        "Khi con đá quả bóng bay đi, lực tác dụng của chân lên quả bóng là lực tiếp xúc hay không tiếp xúc?"
      ],
      "home_experiments": [
        {
          "title": "Chiếc kim ma thuật lơ lửng giữa không trung",
          "materials": [
            "1 chiếc kim khâu sắt",
            "1 sợi chỉ dài 20cm",
            "1 thanh nam châm mạnh",
            "Băng dính"
          ],
          "steps": [
            "Buộc sợi chỉ vào lỗ kim, dán cố định đầu kia sợi chỉ xuống mặt bàn.",
            "Cầm nam châm giữ phía trên mũi kim khoảng 1 cm sao cho kim bị hút dựng đứng lơ lửng.",
            "Kéo nhẹ nam châm lên từ từ để kim không chạm vào nam châm nhưng vẫn đứng thẳng trên không."
          ],
          "expected_outcome": "Chiếc kim lơ lửng giữa không trung mà không chạm vào nam châm, chứng minh lực từ là lực không tiếp xúc.",
          "safety_notes": "Cẩn thận với mũi kim khâu nhọn tránh đâm vào tay."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Lực nào dưới đây là ví dụ điển hình về LỰC KHÔNG TIẾP XÚC?",
        "options": [
          {
            "id": "A",
            "text": "Lực của tay đẩy cánh cửa mở ra"
          },
          {
            "id": "B",
            "text": "Lực từ của nam châm hút đinh sắt từ xa"
          },
          {
            "id": "C",
            "text": "Lực của búa gõ đập vào chiếc đinh"
          },
          {
            "id": "D",
            "text": "Lực của ngón tay kéo dãn sợi dây cao su"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Hai vật không cần phải chạm trực tiếp vào nhau vẫn có lực tác dụng."
          }
        ],
        "explanation": "Lực từ tác dụng qua từ trường trong không gian mà không cần tiếp xúc cơ học."
      },
      {
        "question_type": "mcq",
        "prompt": "Một lò xo có chiều dài ban đầu $l_0 = 12\\,\\text{cm}$. Khi treo một quả nặng, lò xo dãn ra đến chiều dài $l = 15\\,\\text{cm}$. Độ dãn $\\Delta l$ của lò xo là:",
        "options": [
          {
            "id": "A",
            "text": "3 cm"
          },
          {
            "id": "B",
            "text": "27 cm"
          },
          {
            "id": "C",
            "text": "15 cm"
          },
          {
            "id": "D",
            "text": "1.25 cm"
          }
        ],
        "correct_answer": "A",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Độ dãn bằng chiều dài lúc sau trừ chiều dài ban đầu: $\\Delta l = l - l_0$."
          }
        ],
        "explanation": "$\\Delta l = 15 - 12 = 3\\,\\text{cm}$."
      },
      {
        "question_type": "numeric",
        "prompt": "Treo một quả cân $50\\,\\text{g}$ thì lò xo dãn thêm $2\\,\\text{cm}$. Trong giới hạn đàn hồi, nếu treo tổng cộng 2 quả cân giống hệt nhau như thế ($100\\,\\text{g}$) thì lò xo dãn thêm bao nhiêu cm?",
        "correct_answer": "4",
        "numeric_tolerance": 0.02,
        "numeric_unit": "cm",
        "hints": [
          {
            "level": 1,
            "hint": "Độ dãn của lò xo tỉ lệ thuận với khối lượng quả cân treo vào: $2 \\times 2 = 4\\,\\text{cm}$."
          }
        ],
        "explanation": "Khối lượng tăng gấp đôi thì độ dãn của lò xo cũng tăng gấp đôi: $\\Delta l = 2 \\times 2 = 4\\,\\text{cm}$.",
        "difficulty": "medium",
        "points": 10
      },
      {
        "question_type": "mcq",
        "prompt": "Khi biểu diễn một lực bằng một mũi tên (vectơ lực), điểm gốc của mũi tên được đặt tại đâu?",
        "options": [
          {
            "id": "A",
            "text": "Tại điểm đặt của lực trên vật chịu tác dụng"
          },
          {
            "id": "B",
            "text": "Tại trọng tâm của Trái Đất"
          },
          {
            "id": "C",
            "text": "Tại mũi tên chỉ chiều chuyển động"
          },
          {
            "id": "D",
            "text": "Tại bất kỳ vị trí nào trên trang giấy"
          }
        ],
        "correct_answer": "A",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Gốc mũi tên là nơi lực tác dụng trực tiếp lên vật."
          }
        ],
        "explanation": "Gốc của mũi tên biểu diễn lực được đặt tại điểm đặt của lực trên vật chịu tác dụng."
      },
      {
        "question_type": "numeric",
        "prompt": "Một lực kế lò xo có giới hạn đo là $5\\,\\text{N}$. Thang đo từ vạch 0 đến vạch 5 N được chia thành 50 khoảng bằng nhau. Tính độ chia nhỏ nhất (ĐCNN) của lực kế theo đơn vị Newton ($\\text{N}$).",
        "correct_answer": "0.1",
        "numeric_tolerance": 0.02,
        "numeric_unit": "N",
        "hints": [
          {
            "level": 1,
            "hint": "Lấy giá trị lớn nhất chia cho số khoảng chia: $5 / 50$."
          }
        ],
        "explanation": "$\\text{ĐCNN} = 5 / 50 = 0.1\\,\\text{N}$.",
        "difficulty": "medium",
        "points": 10
      },
      {
        "question_type": "mcq",
        "prompt": "Lực hút của Trái Đất tác dụng lên một vật rơi tự do có phương và chiều như thế nào?",
        "options": [
          {
            "id": "A",
            "text": "Phương nằm ngang, chiều từ trái sang phải"
          },
          {
            "id": "B",
            "text": "Phương thẳng đứng, chiều từ trên xuống dưới"
          },
          {
            "id": "C",
            "text": "Phương thẳng đứng, chiều từ dưới lên trên"
          },
          {
            "id": "D",
            "text": "Phương xiên một góc 45 độ"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Trọng lực hướng về tâm Trái Đất, tức là phương thẳng đứng, chiều hướng xuống."
          }
        ],
        "explanation": "Trọng lực luôn có phương thẳng đứng và chiều hướng về phía tâm Trái Đất (từ trên xuống)."
      }
    ]
  },
  {
    "grade": 6,
    "tier": "middle",
    "topicTitle": "Lực ma sát và lực cản của môi trường",
    "slug": "lop-6-luc-ma-sat-luc-can",
    "topicDescription": "Tìm hiểu ma sát trượt, ma sát nghỉ, lực cản không khí, vai trò có lợi và có hại của ma sát.",
    "icon": "Move",
    "lessonTitle": "Lực ma sát: Bạn hay thù?",
    "lessonSlug": "luc-ma-sat-ban-hay-thu",
    "contentMarkdown": "# Lực ma sát trong cuộc sống\n\nLực ma sát xuất hiện ở bề mặt tiếp xúc giữa hai vật và cản trở chuyển động của chúng:\n- **Ma sát trượt**: Xuất hiện khi một vật trượt trên bề mặt vật khác (ví dụ: gôm tẩy trượt trên trang giấy, má phanh ép vào vành xe).\n- **Ma sát nghỉ**: Giữ cho vật đứng yên không bị trượt khi bị lực kéo nhẹ (giúp con người bước đi mà không bị ngã trơn trượt).\n- **Ma sát có lợi**: Giúp xe cộ phanh dừng lại, giúp tay cầm nắm cốc nước không bị tuột.\n- **Ma sát có hại**: Làm mòn lốp xe, nóng ổ trục máy móc (người ta tra dầu mỡ hoặc dùng ổ bi để giảm ma sát).",
    "summary": "Ma sát cản trở chuyển động nhưng rất cần thiết để con người bước đi và xe cộ di chuyển an toàn.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Giúp học sinh nhìn nhận tính hai mặt của lực ma sát và nguyên lý ứng dụng con lăn, dầu bôi trơn trong kỹ thuật.",
      "misconceptions": [
        "Học sinh thường nghĩ ma sát luôn là lực có hại và muốn loại bỏ hoàn toàn ma sát khỏi thế giới.",
        "Học sinh nghĩ bề mặt càng nhẵn bóng hoàn hảo thì ma sát càng lớn."
      ],
      "guiding_questions": [
        "Nếu mặt đường hoàn toàn trơn tuột không hề có lực ma sát, chiếc ô tô có thể lăn bánh khởi hành được không?",
        "Tại sao đế giày thể thao và lốp xe máy luôn được khía nhiều rãnh gai sâu?"
      ],
      "home_experiments": [
        {
          "title": "Chiếc hộp kéo nặng và sức mạnh của con lăn",
          "materials": [
            "1 hộp sách nặng",
            "5 chiếc bút chì tròn",
            "1 sợi dây chun kéo"
          ],
          "steps": [
            "Buộc dây chun vào hộp sách, kéo hộp trượt trực tiếp trên mặt sàn nhà (dây chun dãn dài vì ma sát trượt lớn).",
            "Xếp 5 chiếc bút chì song song dưới đáy hộp làm con lăn rồi kéo lại bằng dây chun."
          ],
          "expected_outcome": "Dây chun hầu như không bị dãn, hộp sách lăn đi nhẹ nhàng vì ma sát lăn nhỏ hơn ma sát trượt rất nhiều lần.",
          "safety_notes": "Kéo nhẹ nhàng tránh đứt dây chun bắn vào mắt."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Trường hợp nào dưới đây lực ma sát đóng vai trò CÓ HẠI?",
        "options": [
          {
            "id": "A",
            "text": "Ma sát giữa má phanh và vành bánh xe giúp xe dừng lại"
          },
          {
            "id": "B",
            "text": "Ma sát làm mòn xích đĩa xe đạp và nóng ổ trục sau thời gian sử dụng"
          },
          {
            "id": "C",
            "text": "Ma sát giữa đế giày và mặt đường giúp ta không bị trượt ngã"
          },
          {
            "id": "D",
            "text": "Ma sát giữa đầu que diêm và vỏ bao diêm giúp diêm bốc cháy"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Tìm hiện tượng làm hao mòn vật liệu và tiêu tốn năng lượng vô ích."
          }
        ],
        "explanation": "Ma sát làm mòn chi tiết cơ khí và sinh nhiệt hao phí là ma sát có hại cần tra dầu mỡ."
      },
      {
        "question_type": "mcq",
        "prompt": "Biện pháp nào sau đây có tác dụng LÀM GIẢM ma sát trong kỹ thuật?",
        "options": [
          {
            "id": "A",
            "text": "Khía thêm các rãnh gai sâu trên lốp xe ô tô"
          },
          {
            "id": "B",
            "text": "Tra dầu bôi trơn vào xích xe đạp và ổ bi trục quay"
          },
          {
            "id": "C",
            "text": "Rải cát lên đường đóng băng trơn trượt"
          },
          {
            "id": "D",
            "text": "Tăng lực bóp phanh của người lái xe"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Chất bôi trơn tạo một lớp màng ngăn hai bề mặt kim loại tiếp xúc cọ xát trực tiếp."
          }
        ],
        "explanation": "Tra dầu bôi trơn và sử dụng ổ bi là các phương pháp phổ biến nhất để giảm ma sát trượt."
      },
      {
        "question_type": "numeric",
        "prompt": "Một chiếc tủ gỗ chuyển động trượt thẳng đều trên sàn nhà nằm ngang dưới tác dụng của lực kéo $F = 18\\,\\text{N}$. Do tủ chuyển động thẳng đều nên lực ma sát trượt cân bằng với lực kéo. Tính độ lớn lực ma sát trượt theo đơn vị Newton ($\\text{N}$).",
        "correct_answer": "18",
        "numeric_tolerance": 0.02,
        "numeric_unit": "N",
        "hints": [
          {
            "level": 1,
            "hint": "Khi vật trượt thẳng đều, lực kéo cân bằng với lực ma sát: $F_{mst} = F_{k} = 18\\,\\text{N}$."
          }
        ],
        "explanation": "Vật chuyển động thẳng đều chịu tác dụng của hai lực cân bằng nên $F_{mst} = 18\\,\\text{N}$.",
        "difficulty": "medium",
        "points": 10
      },
      {
        "question_type": "mcq",
        "prompt": "Hình dạng cơ thể cá heo, chim hải âu và mũi tàu cao tốc có đặc điểm thon gọn (khí động học) nhằm mục đích chính là:",
        "options": [
          {
            "id": "A",
            "text": "Giảm tối đa lực cản của không khí hoặc của nước"
          },
          {
            "id": "B",
            "text": "Tăng khối lượng riêng của cơ thể"
          },
          {
            "id": "C",
            "text": "Tăng diện tích tiếp xúc để hấp thụ ánh sáng"
          },
          {
            "id": "D",
            "text": "Làm tăng lực đẩy Acsimet"
          }
        ],
        "correct_answer": "A",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Dáng thuôn mượt giúp các dòng chất lưu lướt qua dễ dàng hơn."
          }
        ],
        "explanation": "Hình dạng thuôn nhọn khí động học giúp giảm thiểu sự va đập của các phân tử môi trường, giảm tối đa lực cản."
      },
      {
        "question_type": "numeric",
        "prompt": "Để kéo một khối gỗ trượt trên sàn cần lực kéo $25\\,\\text{N}$. Khi đặt các con lăn tròn bên dưới, lực ma sát lăn chỉ bằng $1/5$ lực ma sát trượt. Tính độ lớn lực kéo cần thiết lúc này theo đơn vị Newton ($\\text{N}$).",
        "correct_answer": "5",
        "numeric_tolerance": 0.02,
        "numeric_unit": "N",
        "hints": [
          {
            "level": 1,
            "hint": "Lấy $25 / 5 = 5\\,\\text{N}$."
          }
        ],
        "explanation": "Lực ma sát lăn nhỏ hơn ma sát trượt rất nhiều lần: $F_{msl} = 25 / 5 = 5\\,\\text{N}$.",
        "difficulty": "medium",
        "points": 10
      },
      {
        "question_type": "mcq",
        "prompt": "Vì sao khi người nhảy dù mở bung vòm dù trên không trung, tốc độ rơi lại giảm nhanh chóng?",
        "options": [
          {
            "id": "A",
            "text": "Vì Trái Đất ngừng tác dụng trọng lực lên người nhảy dù"
          },
          {
            "id": "B",
            "text": "Vì diện tích tiếp xúc lớn của vòm dù tạo ra lực cản không khí rất lớn hướng lên trên"
          },
          {
            "id": "C",
            "text": "Vì khối lượng của chiếc dù bị triệt tiêu"
          },
          {
            "id": "D",
            "text": "Vì nhiệt độ của không khí tăng đột ngột"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Diện tích mặt cản càng lớn thì lực cản của không khí càng mạnh."
          }
        ],
        "explanation": "Vòm dù có diện tích rất rộng tạo ra lực cản không khí lớn cản trở chuyển động rơi, giúp hạ cánh an toàn."
      }
    ]
  },
  {
    "grade": 6,
    "tier": "middle",
    "topicTitle": "Năng lượng và sự chuyển hóa năng lượng",
    "slug": "lop-6-chuyen-hoa-nang-luong",
    "topicDescription": "Các dạng năng lượng (cơ năng, nhiệt năng, điện năng, quang năng) và định luật bảo toàn năng lượng.",
    "icon": "Zap",
    "lessonTitle": "Năng lượng không tự nhiên sinh ra",
    "lessonSlug": "dinh-luat-bao-toan-nang-luong",
    "contentMarkdown": "# Năng lượng và sự chuyển hóa\n\nNăng lượng là khả năng thực hiện công hoặc truyền nhiệt của một vật:\n- Các dạng năng lượng phổ biến: **Cơ năng** (động năng, thế năng), **Nhiệt năng**, **Điện năng**, **Quang năng**, **Hóa năng**.\n- Sự chuyển hóa năng lượng:\n  - Bàn là điện: Điện năng $\\rightarrow$ Nhiệt năng.\n  - Quạt trần: Điện năng $\\rightarrow$ Cơ năng (quay cánh quạt).\n  - Đèn pin: Hóa năng trong pin $\\rightarrow$ Điện năng $\\rightarrow$ Quang năng.\n- **Định luật bảo toàn năng lượng**: Năng lượng không tự nhiên sinh ra cũng không tự nhiên mất đi, nó chỉ truyền từ vật này sang vật khác hoặc chuyển hóa từ dạng này sang dạng khác.",
    "summary": "Năng lượng tồn tại dưới nhiều dạng và luôn tuân theo định luật bảo toàn: chỉ biến đổi dạng chứ không mất đi.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Khắc sâu định luật tự nhiên cơ bản nhất của vũ trụ: năng lượng luôn được bảo toàn trong mọi quá trình biến đổi.",
      "misconceptions": [
        "Học sinh nghĩ năng lượng khi dùng xong là biến mất vĩnh viễn vào hư vô.",
        "Học sinh nghĩ có thể chế tạo được động cơ vĩnh cửu tự chạy mãi mãi mà không cần cung cấp nhiên liệu."
      ],
      "guiding_questions": [
        "Khi con đi xe đạp leo lên đỉnh dốc rồi thả trôi xuống dốc, năng lượng đã chuyển hóa giữa những dạng nào?",
        "Nhiên liệu xăng đổ vào xe máy đã biến thành những dạng năng lượng nào khi xe chạy trên đường?"
      ],
      "home_experiments": [
        {
          "title": "Chiếc xích đu chuyển hóa thế năng và động năng",
          "materials": [
            "1 sợi chỉ dài 50 cm",
            "1 quả cầu nhỏ bằng đất nặn",
            "1 thanh giá đỡ"
          ],
          "steps": [
            "Treo quả cầu vào sợi chỉ làm con lắc.",
            "Kéo quả cầu lên cao (tích lũy thế năng) rồi buông tay nhẹ nhàng.",
            "Quan sát khi đi qua vị trí thấp nhất (vận tốc lớn nhất, động năng cực đại)."
          ],
          "expected_outcome": "Thế năng chuyển hóa thành động năng khi hạ thấp, và động năng chuyển ngược thành thế năng khi bay lên cao.",
          "safety_notes": "Thả con lắc nhẹ nhàng không làm đổ giá đỡ."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Khi chiếc quạt điện hoạt động bình thường, điện năng chủ yếu được chuyển hóa thành dạng năng lượng nào?",
        "options": [
          {
            "id": "A",
            "text": "Quang năng chiếu sáng"
          },
          {
            "id": "B",
            "text": "Cơ năng làm quay cánh quạt"
          },
          {
            "id": "C",
            "text": "Hóa năng tích trữ"
          },
          {
            "id": "D",
            "text": "Hạt nhân nguyên tử"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Cánh quạt quay tạo ra luồng gió là chuyển động cơ học."
          }
        ],
        "explanation": "Quạt điện biến đổi điện năng thành cơ năng làm quay cánh quạt."
      },
      {
        "question_type": "mcq",
        "prompt": "Nguồn năng lượng nào dưới đây là nguồn NĂNG LƯỢNG TÁI TẠO thân thiện với môi trường?",
        "options": [
          {
            "id": "A",
            "text": "Than đá khai thác từ mỏ"
          },
          {
            "id": "B",
            "text": "Dầu mỏ và khí đốt tự nhiên"
          },
          {
            "id": "C",
            "text": "Năng lượng gió và năng lượng ánh sáng Mặt Trời"
          },
          {
            "id": "D",
            "text": "Nhiên liệu khí hóa lỏng LPG"
          }
        ],
        "correct_answer": "C",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Năng lượng tái tạo là nguồn năng lượng thiên nhiên tự hồi phục liên tục và không bị cạn kiệt."
          }
        ],
        "explanation": "Năng lượng Mặt Trời và năng lượng gió là các nguồn năng lượng tái tạo sạch, vô tận."
      },
      {
        "question_type": "numeric",
        "prompt": "Một bóng đèn sợi đốt nhận $100\\,\\text{J}$ điện năng trong 1 giây. Trong đó chỉ có $15\\,\\text{J}$ được chuyển hóa thành quang năng có ích, phần còn lại tỏa nhiệt vô ích ra môi trường. Tính nhiệt lượng hao phí tỏa ra trong 1 giây theo đơn vị Joule ($\\text{J}$).",
        "correct_answer": "85",
        "numeric_tolerance": 0.02,
        "numeric_unit": "J",
        "hints": [
          {
            "level": 1,
            "hint": "Nhiệt lượng hao phí bằng năng lượng toàn phần trừ đi năng lượng có ích: $100 - 15$."
          }
        ],
        "explanation": "$E_{\\text{hao phí}} = 100 - 15 = 85\\,\\text{J}$. Hiệu suất phát sáng của đèn sợi đốt rất thấp nên cần thay bằng đèn LED.",
        "difficulty": "medium",
        "points": 10
      },
      {
        "question_type": "mcq",
        "prompt": "Trong nhà máy thủy điện, sự chuyển hóa năng lượng diễn ra theo chu trình chính nào để tạo ra dòng điện?",
        "options": [
          {
            "id": "A",
            "text": "Thế năng của nước trên đập cao -> Động năng dòng nước -> Điện năng"
          },
          {
            "id": "B",
            "text": "Hóa năng -> Nhiệt năng -> Điện năng"
          },
          {
            "id": "C",
            "text": "Quang năng -> Nhiệt năng -> Cơ năng"
          },
          {
            "id": "D",
            "text": "Nhiệt năng -> Động năng -> Hóa năng"
          }
        ],
        "correct_answer": "A",
        "difficulty": "medium",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Nước ở trên cao có thế năng hấp dẫn, khi chảy xuống làm quay tuabin phát điện."
          }
        ],
        "explanation": "Nước tích trữ ở hồ chứa trên cao có thế năng, chảy xuống biến thành động năng làm quay máy phát điện tạo ra điện năng."
      },
      {
        "question_type": "numeric",
        "prompt": "Một chiếc ấm đun nước điện tiêu thụ $2000\\,\\text{J}$ điện năng. Biết hiệu suất làm nóng của ấm là $85\\%$ (tức là $85\\%$ điện năng được chuyển hóa thành nhiệt năng có ích truyền vào nước). Tính nhiệt lượng có ích truyền vào nước theo đơn vị Joule ($\\text{J}$).",
        "correct_answer": "1700",
        "numeric_tolerance": 0.02,
        "numeric_unit": "J",
        "hints": [
          {
            "level": 1,
            "hint": "Tính $85\\%$ của $2000\\,\\text{J}$: $2000 \\times 0.85$."
          }
        ],
        "explanation": "$Q_{\\text{có ích}} = 2000 \\times 0.85 = 1700\\,\\text{J}$.",
        "difficulty": "hard",
        "points": 15
      },
      {
        "question_type": "mcq",
        "prompt": "Phát biểu nào sau đây phản ánh ĐÚNG định luật bảo toàn năng lượng?",
        "options": [
          {
            "id": "A",
            "text": "Năng lượng có thể tự nhiên sinh ra khi cần thiết"
          },
          {
            "id": "B",
            "text": "Năng lượng không tự sinh ra và cũng không tự mất đi, chỉ chuyển hóa từ dạng này sang dạng khác hoặc truyền từ vật này sang vật khác"
          },
          {
            "id": "C",
            "text": "Sau một thời gian sử dụng thì năng lượng sẽ tự động biến mất hoàn toàn"
          },
          {
            "id": "D",
            "text": "Tổng năng lượng của một hệ kín luôn luôn giảm dần theo thời gian"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Định luật bảo toàn năng lượng khẳng định năng lượng là đại lượng được bảo toàn tuyệt đối."
          }
        ],
        "explanation": "Định luật bảo toàn năng lượng: Năng lượng không tự nhiên sinh ra và cũng không tự nhiên mất đi, chỉ biến đổi từ dạng này sang dạng khác."
      }
    ]
  },
  {
    "grade": 7,
    "tier": "middle",
    "topicTitle": "Đo tốc độ và đồ thị quãng đường - thời gian",
    "slug": "lop-7-do-toc-do-do-thi",
    "topicDescription": "Công thức tốc độ v = s/t, vẽ và phân tích đồ thị quãng đường s theo thời gian t.",
    "icon": "LineChart",
    "lessonTitle": "Tốc độ và Đồ thị chuyển động",
    "lessonSlug": "toc-do-va-do-thi",
    "contentMarkdown": "# Khái niệm tốc độ và đồ thị\n\nTốc độ là đại lượng đặc trưng cho mức độ nhanh hay chậm của chuyển động:\n- Công thức tính tốc độ:\n$$v = \\frac{s}{t}$$\nTrong đó:\n- $s$ là quãng đường đi được (đơn vị: $m$ hoặc $km$).\n- $t$ là thời gian đi hết quãng đường đó (đơn vị: $s$ hoặc $h$).\n- $v$ là tốc độ chuyển động (đơn vị: $m/s$ hoặc $km/h$). Đổi đơn vị: $1\\text{ m/s} = 3.6\\text{ km/h}$.\n\nĐồ thị quãng đường - thời gian biểu diễn sự phụ thuộc của $s$ theo $t$. Đường đồ thị dốc càng cao thì vật chuyển động càng nhanh; đường nằm ngang ứng với vật đang đứng yên.",
    "summary": "Tốc độ v = s/t biểu thị mức độ nhanh chậm. Đồ thị s-t giúp phân tích trạng thái chuyển động trực quan.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Dạy học sinh kỹ năng tính toán tốc độ chuyển động thực tế và đọc hiểu đồ thị tọa độ trong đời sống giao thông.",
      "misconceptions": [
        "Học sinh thường quên đổi đồng nhất đơn vị giữa km/h và m/s dẫn đến tính sai kết quả.",
        "Nhầm lẫn đồ thị s-t nằm ngang là vật đi với tốc độ không đổi (thực tế s không đổi nghĩa là vật đang dừng lại)."
      ],
      "guiding_questions": [
        "Nếu một người đi xe máy từ Hà Nội về Phủ Lý quãng đường $60\\text{ km}$ hết $1.5\\text{ giờ}$, tốc độ trung bình là bao nhiêu km/h?",
        "Trên đồ thị quãng đường - thời gian, đoạn thẳng nằm ngang song song trục thời gian có ý nghĩa gì?"
      ],
      "home_experiments": [
        {
          "title": "Đo tốc độ lăn của quả bóng trên sàn",
          "materials": [
            "1 quả bóng bàn",
            "1 thước dây cuộn",
            "Đồng hồ bấm giây điện thoại"
          ],
          "steps": [
            "Dùng thước dây đánh dấu quãng đường $s = 2\\text{ m}$ trên sàn nhà.",
            "Đẩy nhẹ quả bóng lăn qua vạch xuất phát và bấm đồng hồ, dừng bấm khi bóng qua vạch đích.",
            "Áp dụng công thức $v = \\frac{s}{t}$ để tính tốc độ chuyển động của quả bóng."
          ],
          "expected_outcome": "Học sinh đo được thời gian thực tế và tính được tốc độ chuyển động chính xác theo đơn vị m/s.",
          "safety_notes": "Thực hiện trên sàn nhà bằng phẳng không có chướng ngại vật."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một vận động viên bơi lội bơi được quãng đường $s = 100\\text{ m}$ trong thời gian $t = 50\\text{ s}$. Tốc độ bơi trung bình của vận động viên này là bao nhiêu m/s?",
        "latex_formula": "v = \\frac{s}{t}",
        "correct_answer": "2",
        "numeric_tolerance": 0.02,
        "numeric_unit": "m/s",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Áp dụng công thức tốc độ: $v = \\frac{s}{t}$ với $s = 100\\text{ m}$ và $t = 50\\text{ s}$."
          }
        ],
        "explanation": "Áp dụng công thức $v = \\frac{s}{t} = \\frac{100}{50} = 2\\text{ m/s}$."
      }
    ]
  },
  {
    "grade": 7,
    "tier": "middle",
    "topicTitle": "Độ to, độ cao của âm thanh và phản xạ âm",
    "slug": "lop-7-song-am-tieng-vang",
    "topicDescription": "Tần số dao động quyết định độ cao (bổng/trầm), biên độ quyết định độ to (dB), tiếng vang và ô nhiễm tiếng ồn.",
    "icon": "VolumeX",
    "lessonTitle": "Đặc tính của sóng âm",
    "lessonSlug": "dac-tinh-song-am",
    "contentMarkdown": "# Tần số, biên độ và tiếng vang\n\nSóng âm có hai đặc trưng sinh lý gắn liền với đại lượng vật lý:\n- **Độ cao của âm**: Do **tần số dao động** ($f$, đơn vị Héc - $Hz$) quyết định.\n  - Tần số càng lớn $\\rightarrow$ dao động càng nhanh $\\rightarrow$ âm phát ra càng **cao (bổng)**.\n  - Tần số càng nhỏ $\\rightarrow$ dao động càng chậm $\\rightarrow$ âm phát ra càng **thấp (trầm)**.\n- **Độ to của âm**: Do **biên độ dao động** quyết định. Biên độ càng lớn, âm nghe càng to (đo bằng đề-xi-ben, $dB$).\n- **Phản xạ âm & Tiếng vang**: Khi sóng âm gặp mặt chắn (vách đá, bức tường lớn) bị dội ngược trở lại. Ta nghe thấy tiếng vang khi âm phản xạ đến tai cách âm trực tiếp ít nhất $\\frac{1}{15}$ giây.",
    "summary": "Tần số quyết định âm trầm hay bổng. Biên độ quyết định âm to hay nhỏ. Âm dội lại từ mặt chắn tạo ra tiếng vang.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Giúp học sinh phân biệt rạch ròi giữa độ to và độ bổng của âm thanh, nhận biết tác hại của ô nhiễm tiếng ồn đô thị.",
      "misconceptions": [
        "Học sinh hay nhầm lẫn giữa âm to (biên độ lớn) với âm cao/bổng (tần số lớn).",
        "Nghĩ rằng trong phòng nhỏ không có âm phản xạ (thực tế có phản xạ nhưng đến quá nhanh nên tai không phân biệt được thành tiếng vang)."
      ],
      "guiding_questions": [
        "Giọng hát của ca sĩ nữ sonprano cao vút khác với giọng nam trầm ấm về tần số dao động như thế nào?",
        "Tại sao khi đứng hét to trong hang đá lớn con lại nghe thấy tiếng của mình vọng lại sau một tích tắc?"
      ],
      "home_experiments": [
        {
          "title": "Chiếc thước kẻ biến đổi tần số âm thanh",
          "materials": [
            "1 chiếc thước nhựa dẻo dài 30 cm",
            "Mặt bàn học phẳng"
          ],
          "steps": [
            "Đặt thước nhô ra khỏi mép bàn 20 cm, lấy tay ấn chặt phần thước trên bàn.",
            "Dùng tay kia gảy mạnh đầu tự do và lắng nghe âm phát ra (âm trầm, thước rung chậm).",
            "Rút ngắn phần nhô ra còn 8 cm và gảy lại."
          ],
          "expected_outcome": "Khi phần nhô ra ngắn lại, thước rung nhanh hơn (tần số cao hơn) và phát ra âm thanh cao vút hơn hẳn.",
          "safety_notes": "Ấn giữ thước chắc tay tránh thước văng trúng mặt."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Đại lượng vật lý nào quyết định độ CAO (bổng hay trầm) của âm thanh phát ra?",
        "options": [
          {
            "id": "A",
            "text": "Tần số dao động của nguồn âm"
          },
          {
            "id": "B",
            "text": "Biên độ dao động của nguồn âm"
          },
          {
            "id": "C",
            "text": "Vận tốc gió trong phòng"
          },
          {
            "id": "D",
            "text": "Khoảng cách từ nguồn âm đến tai"
          }
        ],
        "correct_answer": "A",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Số dao động thực hiện được trong một giây (đo bằng Hz)."
          }
        ],
        "explanation": "Tần số dao động quyết định độ cao (âm trầm hay âm bổng) của âm thanh."
      }
    ]
  },
  {
    "grade": 7,
    "tier": "middle",
    "topicTitle": "Sự truyền ánh sáng, tia sáng và vùng tối",
    "slug": "lop-7-tia-sang-vung-toi",
    "topicDescription": "Định luật truyền thẳng của ánh sáng, mô hình tia sáng, chùm sáng, giải thích hiện tượng nhật thực và nguyệt thực.",
    "icon": "Eye",
    "lessonTitle": "Định luật truyền thẳng của ánh sáng",
    "lessonSlug": "dinh-luat-truyen-thang",
    "contentMarkdown": "# Ánh sáng truyền theo đường nào?\n\nTrong môi trường trong suốt và đồng tính (như không khí trong lành, nước tinh khiết), **ánh sáng truyền đi theo đường thẳng**:\n- **Tia sáng**: Biểu diễn bằng một đường thẳng có mũi tên chỉ hướng truyền của ánh sáng.\n- **Chùm sáng**: Tập hợp của nhiều tia sáng (chùm song song, chùm hội tụ, chùm phân kỳ).\n- **Vùng tối và vùng nửa tối**: Phía sau vật cản có vùng tối hoàn toàn (không nhận được ánh sáng từ nguồn) và vùng nửa tối (chỉ nhận được một phần ánh sáng).\n- **Nhật thực**: Xảy ra khi Mặt Trăng nằm giữa Mặt Trời và Trái Đất, bóng của Mặt Trăng che khuất Mặt Trời.\n- **Nguyệt thực**: Xảy ra khi Trái Đất nằm giữa Mặt Trời và Mặt Trăng, bóng của Trái Đất che khuất Mặt Trăng.",
    "summary": "Ánh sáng truyền thẳng trong môi trường trong suốt đồng tính. Bóng tối giải thích hiện tượng nhật thực và nguyệt thực.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Giải thích hiện tượng thiên văn kỳ thú nhật thực và nguyệt thực dựa trên định luật truyền thẳng của ánh sáng.",
      "misconceptions": [
        "Học sinh thường nhầm lẫn vị trí của Mặt Trăng và Trái Đất trong nhật thực và nguyệt thực.",
        "Nghĩ rằng ánh sáng có thể tự uốn cong qua góc tường mà không cần gương phản xạ."
      ],
      "guiding_questions": [
        "Vào ban ngày khi Mặt Trăng che khuất Mặt Trời làm trời tối sầm lại giữa trưa, hiện tượng đó gọi là gì?",
        "Tại sao người thợ mộc thường nheo một mắt ngắm dọc theo mép thanh gỗ để xem thanh gỗ có thẳng hay không?"
      ],
      "home_experiments": [
        {
          "title": "Kiểm chứng đường truyền thẳng của ánh sáng qua 3 tấm bìa",
          "materials": [
            "3 tấm bìa cứng có đục 1 lỗ nhỏ ở chính giữa",
            "1 ngọn nến hoặc đèn pin"
          ],
          "steps": [
            "Đặt ngọn nến thắp sáng ở đầu bàn.",
            "Xếp 3 tấm bìa sao cho 3 lỗ thủng thẳng hàng với ngọn nến.",
            "Đặt mắt nhìn qua lỗ ở tấm bìa thứ ba để thấy ngọn nến, sau đó dịch nhẹ tấm bìa ở giữa lệch sang một bên."
          ],
          "expected_outcome": "Khi 3 lỗ thẳng hàng thì nhìn thấy nến. Khi xê dịch tấm bìa giữa làm lệch đường thẳng, ánh sáng bị chặn lại ngay lập tức.",
          "safety_notes": "Thao tác cẩn thận với ngọn nến đang cháy."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Hiện tượng Nhật thực xảy ra khi vị trí của 3 thiên thể sắp xếp như thế nào theo đường thẳng?",
        "options": [
          {
            "id": "A",
            "text": "Trái Đất nằm ở giữa Mặt Trời và Mặt Trăng"
          },
          {
            "id": "B",
            "text": "Mặt Trăng nằm ở giữa Mặt Trời và Trái Đất"
          },
          {
            "id": "C",
            "text": "Mặt Trời nằm ở giữa Trái Đất và Mặt Trăng"
          },
          {
            "id": "D",
            "text": "Mặt Trăng biến mất hoàn toàn khỏi quỹ đạo"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Mặt Trăng che khuất ánh sáng từ Mặt Trời chiếu xuống bề mặt Trái Đất."
          }
        ],
        "explanation": "Nhật thực xảy ra khi Mặt Trăng nằm giữa Mặt Trời và Trái Đất, đổ bóng tối lên Trái Đất."
      }
    ]
  },
  {
    "grade": 7,
    "tier": "middle",
    "topicTitle": "Sự phản xạ ánh sáng & Định luật phản xạ",
    "slug": "lop-7-dinh-luat-phan-xa-anh-sang",
    "topicDescription": "Hiện tượng phản xạ ánh sáng, tia tới, tia phản xạ, pháp tuyến và định luật góc phản xạ bằng góc tới (i' = i).",
    "icon": "Sparkle",
    "lessonTitle": "Định luật phản xạ ánh sáng",
    "lessonSlug": "dinh-luat-phan-xa",
    "contentMarkdown": "# Ánh sáng bật ngược trở lại\n\nKhi tia sáng chiếu vào bề mặt nhẵn bóng (như gương phẳng, mặt nước lặng), tia sáng bị hắt ngược trở lại môi trường cũ gọi là **sự phản xạ ánh sáng**:\n- **Định luật phản xạ ánh sáng**:\n  1. Tia phản xạ nằm trong mặt phẳng tới (mặt phẳng chứa tia tới và pháp tuyến của gương tại điểm tới).\n  2. Góc phản xạ ($i'$) luôn bằng góc tới ($i$):\n$$i' = i$$\n- **Tính chất ảnh qua gương phẳng**:\n  - Là ảnh ảo, không hứng được trên màn chắn.\n  - Độ lớn của ảnh bằng đúng độ lớn của vật ($A'B' = AB$).\n  - Khoảng cách từ ảnh đến gương bằng khoảng cách từ vật đến gương ($d' = d$).",
    "summary": "Định luật phản xạ ánh sáng: Tia phản xạ nằm trong mặt phẳng tới, góc phản xạ bằng góc tới (i' = i).",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Giúp học sinh vẽ đường đi của tia sáng phản xạ qua gương và hiểu tính chất đối xứng của ảnh tạo bởi gương phẳng.",
      "misconceptions": [
        "Học sinh thường đo góc tới và góc phản xạ so với mặt gương thay vì so với đường pháp tuyến vuông góc.",
        "Nghĩ rằng ảnh trong gương phẳng nhỏ hơn khi mình lùi ra xa gương."
      ],
      "guiding_questions": [
        "Nếu một tia sáng chiếu vuông góc vào mặt gương phẳng (góc tới $i = 0^\\circ$), tia phản xạ sẽ đi theo hướng nào?",
        "Khi con đứng cách gương phẳng $1.5\\text{ m}$, ảnh của con trong gương cách con một khoảng bao nhiêu mét?"
      ],
      "home_experiments": [
        {
          "title": "Khám phá ảnh đối xứng qua gương phẳng",
          "materials": [
            "1 chiếc gương soi nhỏ phẳng",
            "1 tờ giấy có viết chữ \"VẬT LÝ\" bằng bút dạ đậm"
          ],
          "steps": [
            "Đặt tờ giấy trước gương phẳng và nhìn ảnh của dòng chữ trong gương.",
            "Nhận xét hướng quay của chữ cái và tính chất đối xứng trái - phải của ảnh."
          ],
          "expected_outcome": "Dòng chữ trong gương bị đảo ngược chiều trái - phải theo nguyên tắc đối xứng của gương phẳng.",
          "safety_notes": "Cầm gương cẩn thận tránh làm rơi vỡ cạnh kính sắc."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một tia sáng chiếu tới mặt gương phẳng với góc tới $i = 35^\\circ$ so với pháp tuyến. Góc phản xạ $i'$ có độ lớn bằng bao nhiêu độ?",
        "latex_formula": "i' = i",
        "correct_answer": "35",
        "numeric_tolerance": 0.02,
        "numeric_unit": "deg",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Theo định luật phản xạ ánh sáng: góc phản xạ luôn bằng góc tới ($i' = i$)."
          }
        ],
        "explanation": "Theo định luật phản xạ ánh sáng, góc phản xạ $i' = i = 35^\\circ$."
      }
    ]
  },
  {
    "grade": 8,
    "tier": "middle",
    "topicTitle": "Áp suất chất rắn và áp suất khí quyển",
    "slug": "lop-8-ap-suat-chat-ran-khi-quyen",
    "topicDescription": "Công thức áp suất p = F/S, áp lực, nguyên lý bình thông nhau và áp suất khí quyển.",
    "icon": "Compass",
    "lessonTitle": "Áp lực và Áp suất",
    "lessonSlug": "ap-luc-va-ap-suat",
    "contentMarkdown": "# Khái niệm áp lực và áp suất\n\nÁp lực là lực ép có phương vuông góc với mặt bị ép:\n- **Áp suất** ($p$) là độ lớn của áp lực trên một đơn vị diện tích bị ép:\n$$p = \\frac{F}{S}$$\nTrong đó:\n- $F$ là áp lực tác dụng (đơn vị: Niutơn, $N$).\n- $S$ là diện tích bị ép (đơn vị: mét vuông, $m^2$).\n- $p$ là áp suất (đơn vị: Paxcan, $Pa$ hoặc $N/m^2$).\n- Để tăng áp suất: Tăng áp lực $F$ hoặc giảm diện tích $S$ (ví dụ: mài sắc lưỡi dao, đầu đinh nhọn).\n- Để giảm áp suất: Giảm áp lực $F$ hoặc tăng diện tích $S$ (ví dụ: bánh xích xe tăng bản rộng để không bị lún bùn).",
    "summary": "Áp suất p = F/S đo tác dụng của áp lực lên diện tích bị ép. Muốn tăng áp suất thì giảm diện tích tiếp xúc.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Giúp học sinh hiểu tại sao lưỡi dao sắc thì dễ cắt gọt và tại sao xe tải nặng cần nhiều bánh lốp to bản.",
      "misconceptions": [
        "Học sinh thường đồng nhất áp lực với áp suất (nghĩ lực lớn thì áp suất bắt buộc phải lớn, quên mất diện tích tiếp xúc).",
        "Nghĩ rằng không khí không có trọng lượng nên không tạo ra áp suất khí quyển."
      ],
      "guiding_questions": [
        "Tại sao mũi của chiếc kim khâu và đầu chiếc đinh đóng tường luôn phải được mài rất nhọn?",
        "Vì sao chiếc xe máy xúc đất nặng hàng chục tấn lại chạy bằng dải xích to bản thay vì bánh lốp cao su nhỏ?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát áp suất với ngón tay và chiếc bút bi",
          "materials": [
            "1 chiếc bút bi có nắp bấm"
          ],
          "steps": [
            "Dùng hai ngón tay trỏ ép vào hai đầu của chiếc bút bi (một đầu nhọn, một đầu tù to bản).",
            "Giữ lực ép bằng nhau ở cả hai ngón tay trong 5 giây.",
            "Cảm nhận ngón tay nào bị đau và lõm sâu hơn."
          ],
          "expected_outcome": "Ngón tay ở đầu nhọn bị đau và lõm sâu hơn nhiều vì diện tích tiếp xúc nhỏ sinh ra áp suất rất lớn.",
          "safety_notes": "Chỉ ép nhẹ tay vừa đủ cảm nhận, không ấn quá mạnh làm xước da."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một khối gỗ có trọng lượng $F = 400\\text{ N}$ đặt đứng trên mặt bàn. Diện tích mặt tiếp xúc với bàn là $S = 0.05\\text{ m}^2$. Áp suất khối gỗ tác dụng lên mặt bàn là bao nhiêu Pa?",
        "latex_formula": "p = \\frac{F}{S}",
        "correct_answer": "8000",
        "numeric_tolerance": 0.02,
        "numeric_unit": "Pa",
        "difficulty": "medium",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Áp dụng công thức $p = \\frac{F}{S}$ với $F = 400$ và $S = 0.05$."
          }
        ],
        "explanation": "Áp suất tính bằng công thức: $p = \\frac{F}{S} = \\frac{400}{0.05} = 8000\\text{ Pa}$."
      }
    ]
  },
  {
    "grade": 8,
    "tier": "middle",
    "topicTitle": "Tác dụng làm quay của lực và đòn bẩy",
    "slug": "lop-8-tac-dung-lam-quay-don-bay",
    "topicDescription": "Quy tắc mômen lực, trục quay và ứng dụng đòn bẩy trong đời sống (kéo cắt, xà beng, bập bênh).",
    "icon": "Repeat",
    "lessonTitle": "Đòn bẩy và Mômen lực",
    "lessonSlug": "don-bay-momen-luc",
    "contentMarkdown": "# Tác dụng làm quay của lực\n\nKhi một lực tác dụng vào vật có trục quay cố định, lực có thể làm cho vật quay:\n- **Tác dụng làm quay** phụ thuộc vào:\n  - Độ lớn của lực tác dụng.\n  - Khoảng cách từ trục quay đến giá của lực (gọi là cánh tay đòn).\n- **Quy tắc đòn bẩy**: Lực càng cách xa trục quay thì tác dụng làm quay càng mạnh, giúp ta nâng được vật nặng với lực kéo nhỏ hơn.\n- Ứng dụng: Chiếc kéo cắt kim loại có cán dài lưỡi ngắn; xà beng bẩy hòn đá tảng; chiếc kìm mở nắp chai nước ngọt.",
    "summary": "Lực làm quay vật quanh trục. Đòn bẩy có cánh tay đòn càng dài thì lực tác dụng cần thiết càng nhỏ.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Giúp học sinh hiểu câu nói nổi tiếng của Archimedes: \"Hãy cho tôi một điểm tựa, tôi sẽ nhấc bổng cả Trái Đất\".",
      "misconceptions": [
        "Học sinh nghĩ lực cứ lớn là vật quay nhanh mà không để ý đến khoảng cách từ tay cầm đến bản lề cửa.",
        "Nghĩ rằng đòn bẩy cho ta lợi cả về lực lẫn về đường đi."
      ],
      "guiding_questions": [
        "Tại sao tay nắm cửa phòng luôn được gắn ở mép ngoài xa bản lề nhất có thể thay vì gắn sát bản lề?",
        "Để cắt một thanh sắt cứng dễ dàng, con nên chọn chiếc kìm có cán dài hay cán ngắn?"
      ],
      "home_experiments": [
        {
          "title": "Thử thách đẩy cửa mở ở các vị trí khác nhau",
          "materials": [
            "Cánh cửa phòng ngủ có bản lề quay trơn tru"
          ],
          "steps": [
            "Dùng 1 ngón tay đẩy cánh cửa mở ra tại vị trí tay nắm cửa mép ngoài cùng (rất nhẹ nhàng).",
            "Chuyển ngón tay vào vị trí sát bản lề cách 5 cm rồi dùng lực đẩy cánh cửa mở ra."
          ],
          "expected_outcome": "Đẩy sát bản lề tốn nhiều sức hơn rất nhiều so với đẩy ở mép ngoài, chứng minh cánh tay đòn càng dài tác dụng làm quay càng lớn.",
          "safety_notes": "Không để tay vào khe hở bản lề tránh kẹp ngón tay."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Để mở một chiếc nắp chai nước ngọt bằng khui nắp chai (đòn bẩy), người ta nên làm gì để bẩy nắp nhẹ nhất?",
        "options": [
          {
            "id": "A",
            "text": "Cầm tay sát vào đầu mở nắp của khui"
          },
          {
            "id": "B",
            "text": "Cầm tay ở đuôi cán khui cách xa điểm tựa nhất"
          },
          {
            "id": "C",
            "text": "Dùng một lực kéo hướng thẳng đứng vào giữa chai"
          },
          {
            "id": "D",
            "text": "Đun nóng cả chai nước ngọt"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Cánh tay đòn càng dài thì lực cần tác dụng càng nhỏ."
          }
        ],
        "explanation": "Cầm ở đuôi cán làm tăng cánh tay đòn, tạo mômen quay lớn giúp bẩy nắp chai nhẹ nhàng."
      }
    ]
  },
  {
    "grade": 8,
    "tier": "middle",
    "topicTitle": "Công cơ học và công suất",
    "slug": "lop-8-cong-co-hoc-cong-suat",
    "topicDescription": "Công thức công cơ học A = F.s, công suất P = A/t và ý nghĩa công suất của máy móc (Oát, Mã lực).",
    "icon": "Briefcase",
    "lessonTitle": "Công cơ học và Công suất máy",
    "lessonSlug": "cong-co-hoc-cong-suat-may",
    "contentMarkdown": "# Công cơ học và Công suất\n\nTrong vật lý, công cơ học chỉ xuất hiện khi có lực tác dụng vào vật và làm vật dịch chuyển:\n- **Công cơ học** ($A$):\n$$A = F \\cdot s$$\nTrong đó:\n- $F$ là lực tác dụng cùng hướng dịch chuyển (đơn vị: $N$).\n- $s$ là quãng đường dịch chuyển (đơn vị: $m$).\n- $A$ là công cơ học (đơn vị: Jun, $J$). Đơn vị: $1\\text{ J} = 1\\text{ N} \\cdot 1\\text{ m}$.\n- **Công suất** ($\\mathcal{P}$): Là công thực hiện được trong một đơn vị thời gian, đặc trưng cho tốc độ sinh công:\n$$\\mathcal{P} = \\frac{A}{t}$$\nĐơn vị công suất là Oát ($W$). Đơn vị: $1\\text{ kW} = 1000\\text{ W}$.",
    "summary": "Công cơ học A = F.s chỉ sinh ra khi có chuyển dời. Công suất P = A/t biểu thị tốc độ làm việc nhanh chậm.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Dạy học sinh phân biệt khái niệm \"công\" trong ngôn ngữ đời thường (ngồi suy nghĩ, vác nặng đứng yên) với công cơ học chuẩn xác trong vật lý.",
      "misconceptions": [
        "Học sinh nghĩ một người lực lưỡng đứng gánh tạ nặng $100\\text{ kg}$ đứng yên suốt 1 tiếng là thực hiện công cơ học khổng lồ (thực tế s = 0 nên A = 0).",
        "Nghĩ máy có công suất lớn là máy làm được ít việc hơn."
      ],
      "guiding_questions": [
        "Một người dùng hết sức đẩy bức tường bê tông nhưng tường không hề nhúc nhích, người đó có sinh công cơ học không?",
        "Hai chiếc cần cẩu cùng nâng khối hàng $1\\text{ tấn}$ lên cao $10\\text{ m}$, chiếc A mất $20\\text{ s}$, chiếc B mất $40\\text{ s}$, chiếc nào có công suất lớn hơn?"
      ],
      "home_experiments": [
        {
          "title": "Đo công suất leo cầu thang của chính em",
          "materials": [
            "Cân điện tử đo khối lượng cơ thể",
            "Thước đo chiều cao bậc cầu thang",
            "Đồng hồ bấm giây"
          ],
          "steps": [
            "Cân khối lượng $m$ (kg) để tính trọng lượng $P = 10 \\cdot m$ (N).",
            "Đo tổng chiều cao $h$ (m) của 1 tầng cầu thang nhà em.",
            "Chạy đều lên cầu thang và bấm thời gian $t$ (giây).",
            "Tính công $A = P \\cdot h$ và công suất $\\mathcal{P} = \\frac{A}{t}$."
          ],
          "expected_outcome": "Học sinh tính được chính xác công suất cơ học của bản thân bằng đơn vị Oát (W).",
          "safety_notes": "Leo cầu thang cẩn thận, bám vào tay vịn tránh vấp ngã."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một cần cẩu nâng một kiện hàng có trọng lượng $F = 5000\\text{ N}$ lên độ cao $s = 6\\text{ m}$ theo phương thẳng đứng. Công cơ học do cần cẩu thực hiện là bao nhiêu Jun (J)?",
        "latex_formula": "A = F \\cdot s",
        "correct_answer": "30000",
        "numeric_tolerance": 0.02,
        "numeric_unit": "J",
        "difficulty": "medium",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Áp dụng công thức $A = F \\cdot s$ với $F = 5000\\text{ N}$ và $s = 6\\text{ m}$."
          }
        ],
        "explanation": "Công cơ học tính theo công thức: $A = F \\cdot s = 5000 \\cdot 6 = 30000\\text{ J}$."
      }
    ]
  },
  {
    "grade": 8,
    "tier": "middle",
    "topicTitle": "Nhiệt năng, sự truyền nhiệt & Nhiệt dung riêng",
    "slug": "lop-8-nhiet-nang-nhiet-dung-rieng",
    "topicDescription": "Nhiệt năng, các hình thức truyền nhiệt (dẫn nhiệt, đối lưu, bức xạ nhiệt) và công thức Q = m.c.Delta_t.",
    "icon": "Flame",
    "lessonTitle": "Nhiệt lượng và Phương trình cân bằng nhiệt",
    "lessonSlug": "nhiet-luong-can-bang-nhiet",
    "contentMarkdown": "# Nhiệt năng và Nhiệt lượng\n\nMọi phân tử cấu tạo nên vật chất luôn chuyển động hỗn loạn không ngừng:\n- **Nhiệt năng**: Là tổng động năng của các phân tử cấu tạo nên vật. Nhiệt độ càng cao thì các phân tử chuyển động càng nhanh và nhiệt năng càng lớn.\n- Các hình thức truyền nhiệt:\n  - **Dẫn nhiệt**: Chủ yếu xảy ra trong chất rắn (thìa kim loại dẫn nhiệt).\n  - **Đối lưu**: Truyền nhiệt bằng các dòng chất lỏng hoặc chất khí (đun nước trong ấm, gió biển).\n  - **Bức xạ nhiệt**: Truyền nhiệt bằng các tia nhiệt đi thẳng qua chân không (ánh nắng Mặt Trời sưởi ấm Trái Đất).\n- **Nhiệt lượng** ($Q$):\n$$Q = m \\cdot c \\cdot \\Delta t$$\nTrong đó:\n- $m$ là khối lượng vật (đơn vị: $kg$).\n- $c$ là nhiệt dung riêng của chất (đơn vị: $J/(kg \\cdot K)$).\n- $\\Delta t = t_2 - t_1$ là độ biến thiên nhiệt độ (đơn vị: $^\\circ\\text{C}$ hoặc $K$).",
    "summary": "Nhiệt năng là động năng phân tử. Nhiệt lượng Q = m.c.Delta_t đo năng lượng truyền trong quá trình nhiệt.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Giúp học sinh phân biệt 3 hình thức truyền nhiệt và hiểu vì sao nước có nhiệt dung riêng lớn giúp điều hòa khí hậu ven biển.",
      "misconceptions": [
        "Học sinh nghĩ nhiệt năng và nhiệt độ là một đại lượng giống nhau.",
        "Nghĩ rằng bức xạ nhiệt cần có không khí để truyền đi."
      ],
      "guiding_questions": [
        "Nhiệt từ ngọn lửa Mặt Trời cách xa 150 triệu km truyền qua khoảng không vũ trụ chân không đến Trái Đất bằng hình thức truyền nhiệt nào?",
        "Tại sao khi đun nước trong ấm ta lại đặt ngọn lửa ở dưới đáy ấm chứ không đặt ở trên nắp ấm?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát dòng đối lưu trong nước ấm",
          "materials": [
            "1 cốc thủy tinh chịu nhiệt đựng nước trong",
            "1 giọt phẩm màu hoặc hạt trà túi lọc",
            "Nước nóng"
          ],
          "steps": [
            "Nhỏ nhẹ nhàng 1 giọt phẩm màu xuống đáy cốc nước lạnh.",
            "Đặt đáy cốc lên một bề mặt ấm nóng (như đĩa đựng nước nóng).",
            "Quan sát luồng phẩm màu di chuyển."
          ],
          "expected_outcome": "Dòng nước nóng ở đáy nhẹ hơn nổi lên trên, dòng nước lạnh ở trên chìm xuống tạo thành dòng đối lưu cuốn theo vệt màu rõ rệt.",
          "safety_notes": "Thực hiện cẩn thận với nước nóng."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Nhiệt năng từ Mặt Trời truyền qua khoảng không gian chân không đến Trái Đất chủ yếu bằng hình thức truyền nhiệt nào?",
        "options": [
          {
            "id": "A",
            "text": "Dẫn nhiệt qua kim loại"
          },
          {
            "id": "B",
            "text": "Đối lưu của không khí"
          },
          {
            "id": "C",
            "text": "Bức xạ nhiệt"
          },
          {
            "id": "D",
            "text": "Chuyển động của dòng nước biển"
          }
        ],
        "correct_answer": "C",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Hình thức truyền nhiệt duy nhất có thể đi xuyên qua khoảng chân không tuyệt đối."
          }
        ],
        "explanation": "Bức xạ nhiệt truyền bằng sóng điện từ nên truyền được qua chân không vũ trụ."
      }
    ]
  },
  {
    "grade": 9,
    "tier": "middle",
    "topicTitle": "Đoạn mạch nối tiếp và đoạn mạch song song",
    "slug": "lop-9-doan-mach-noi-tiep-song-song",
    "topicDescription": "Công thức cường độ dòng điện, hiệu điện thế và điện trở tương đương của mạch nối tiếp và mạch song song.",
    "icon": "GitMerge",
    "lessonTitle": "Đặc tính của Mạch điện ghép",
    "lessonSlug": "mach-dien-ghep-noi-tiep-song-song",
    "contentMarkdown": "# Mạch điện nối tiếp và song song\n\nKhi ghép các điện trở trong mạch điện:\n- **Đoạn mạch nối tiếp** ($R_1$ mắc nối tiếp $R_2$):\n  - Cường độ dòng điện: $I = I_1 = I_2$\n  - Hiệu điện thế: $U = U_1 + U_2$\n  - Điện trở tương đương:\n$$R_{td} = R_1 + R_2$$\n- **Đoạn mạch song song** ($R_1$ mắc song song $R_2$):\n  - Hiệu điện thế: $U = U_1 = U_2$\n  - Cường độ dòng điện: $I = I_1 + I_2$\n  - Điện trở tương đương:\n$$\\frac{1}{R_{td}} = \\frac{1}{R_1} + \\frac{1}{R_2} \\implies R_{td} = \\frac{R_1 \\cdot R_2}{R_1 + R_2}$$\nTrong gia đình, các thiết bị điện luôn được mắc song song để hoạt động độc lập với hiệu điện thế định mức $220\\text{V}$.",
    "summary": "Mạch nối tiếp: Rtd = R1 + R2, dòng điện bằng nhau. Mạch song song: 1/Rtd = 1/R1 + 1/R2, hiệu điện thế bằng nhau.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Giúp học sinh làm chủ cách tính điện trở tương đương và giải thích tại sao trong gia đình bóng đèn phòng khách tắt thì đèn phòng ngủ vẫn sáng.",
      "misconceptions": [
        "Học sinh thường nghĩ mắc thêm điện trở song song sẽ làm tăng điện trở toàn mạch (thực tế Rtd giảm đi).",
        "Quên nghịch đảo lại khi tính 1/Rtd trong mạch song song."
      ],
      "guiding_questions": [
        "Tại sao bóng đèn dây tóc trên cây thông Noel kiểu cũ khi cháy một bóng thì toàn bộ dãy đèn tắt ngấm?",
        "Các thiết bị điện trong nhà con được mắc nối tiếp hay song song với nhau? Vì sao?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát mạch điện gia đình an toàn trên bản vẽ",
          "materials": [
            "1 sơ đồ hộp cầu dao / aptomat gia đình",
            "Bút dạ màu"
          ],
          "steps": [
            "Cùng bố mẹ xem bảng điện tổng của nhà.",
            "Xác định các đường dây cấp điện song song ra từng phòng (phòng khách, phòng bếp, phòng ngủ).",
            "Thử tắt aptomat phòng bếp và kiểm tra đèn phòng khách vẫn sáng bình thường."
          ],
          "expected_outcome": "Học sinh chứng minh được các nhánh mạch trong nhà hoạt động độc lập nhờ cách mắc song song.",
          "safety_notes": "Chỉ quan sát dưới sự điều hành trực tiếp của phụ huynh."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Cho hai điện trở $R_1 = 30\\,\\Omega$ và $R_2 = 20\\,\\Omega$ mắc nối tiếp với nhau vào nguồn điện. Điện trở tương đương $R_{td}$ của đoạn mạch có giá trị bằng bao nhiêu Ôm ($\\Omega$)?",
        "latex_formula": "R_{td} = R_1 + R_2",
        "correct_answer": "50",
        "numeric_tolerance": 0.02,
        "numeric_unit": "Ω",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Trong đoạn mạch mắc nối tiếp: $R_{td} = R_1 + R_2$."
          }
        ],
        "explanation": "Áp dụng công thức mắc nối tiếp: $R_{td} = R_1 + R_2 = 30 + 20 = 50\\,\\Omega$."
      }
    ]
  },
  {
    "grade": 9,
    "tier": "middle",
    "topicTitle": "Công suất điện và điện năng tiêu thụ",
    "slug": "lop-9-cong-suat-dien-dien-nang",
    "topicDescription": "Công thức công suất P = U.I, định luật Joule - Lenz Q = I^2.R.t và cách tính số đếm công tơ điện (kWh).",
    "icon": "Power",
    "lessonTitle": "Điện năng và Định luật Joule - Lenz",
    "lessonSlug": "dien-nang-dinh-luat-joule-lenz",
    "contentMarkdown": "# Công suất điện và Điện năng tiêu thụ\n\nĐiện năng cung cấp năng lượng cho mọi hoạt động máy móc:\n- **Công suất điện** ($\\mathcal{P}$):\n$$\\mathcal{P} = U \\cdot I = I^2 \\cdot R = \\frac{U^2}{R}$$\n- **Điện năng tiêu thụ** ($A$):\n$$A = \\mathcal{P} \\cdot t = U \\cdot I \\cdot t$$\n- Trong đời sống, điện năng tiêu thụ đo bằng kilôoát giờ ($kWh$), thường gọi dân dã là **\"số điện\"**:\n$$1\\text{ kWh} = 1000\\text{ W} \\cdot 3600\\text{ s} = 3.6 \\times 10^6\\text{ J} = 3\\,600\\,000\\text{ J}$$\n- **Định luật Joule - Lenz**: Nhiệt lượng tỏa ra trên dây dẫn tỷ lệ thuận với bình phương cường độ dòng điện, với điện trở và thời gian:\n$$Q = I^2 \\cdot R \\cdot t$$",
    "summary": "Công suất P = U.I. Điện năng A = P.t đo bằng kWh (số điện). Nhiệt lượng tỏa ra Q = I^2.R.t theo định luật Joule - Lenz.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Dạy học sinh cách đọc công suất trên nhãn mác đồ gia dụng (nồi cơm, điều hòa) và tự tính tiền điện hàng tháng.",
      "misconceptions": [
        "Học sinh nghĩ kW là đơn vị của năng lượng (kW là công suất, kWh mới là năng lượng).",
        "Nghĩ rằng dùng bóng đèn sợi đốt 100W tiết kiệm hơn bóng LED 15W."
      ],
      "guiding_questions": [
        "Một chiếc điều hòa có công suất $1000\\text{ W}$ chạy liên tục trong $8\\text{ giờ}$ mỗi đêm sẽ tiêu thụ bao nhiêu số điện (kWh)?",
        "Tại sao dây mayso của bếp điện nóng đỏ rực tỏa nhiệt mạnh còn dây đồng nối vào ổ cắm thì hầu như không nóng?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát công suất các đồ điện gia đình",
          "materials": [
            "Sổ tay ghi chép",
            "Quan sát nhãn thông số kỹ thuật trên ấm siêu tốc, tủ lạnh, tivi, bóng đèn"
          ],
          "steps": [
            "Đọc giá trị công suất định mức (W hoặc kW) ghi trên vỏ các thiết bị điện.",
            "Lập bảng tính điện năng tiêu thụ ước tính trong 1 ngày cho từng thiết bị.",
            "So sánh xem thiết bị nào tiêu tốn nhiều điện năng nhất trong gia đình."
          ],
          "expected_outcome": "Học sinh nhận thấy các thiết bị sinh nhiệt (bình nóng lạnh, ấm siêu tốc, bàn là) có công suất lớn nhất (1500W - 2500W).",
          "safety_notes": "Chỉ quan sát bằng mắt các tem nhãn phía ngoài thiết bị."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một bóng đèn sợi đốt ghi $220\\text{V} - 100\\text{W}$ được sử dụng ở hiệu điện thế $220\\text{V}$ trong thời gian $5\\text{ giờ}$. Điện năng tiêu thụ của bóng đèn trong thời gian đó là bao nhiêu kilôoát giờ (kWh)?",
        "latex_formula": "A = \\mathcal{P} \\cdot t",
        "correct_answer": "0.5",
        "numeric_tolerance": 0.02,
        "numeric_unit": "kWh",
        "difficulty": "medium",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Đổi công suất $\\mathcal{P} = 100\\text{ W} = 0.1\\text{ kW}$, sau đó lấy $A = \\mathcal{P} \\cdot t$ với $t = 5\\text{ h}$."
          }
        ],
        "explanation": "Điện năng tiêu thụ tính bằng: $A = \\mathcal{P} \\cdot t = 0.1\\text{ kW} \\cdot 5\\text{ h} = 0.5\\text{ kWh}$."
      }
    ]
  },
  {
    "grade": 9,
    "tier": "middle",
    "topicTitle": "Từ trường, từ phổ và nam châm điện",
    "slug": "lop-9-tu-truong-nam-cham-dien",
    "topicDescription": "Không gian quanh nam châm có từ trường, quy tắc bàn tay phải xác định chiều đường sức từ của ống dây có dòng điện.",
    "icon": "Magnet",
    "lessonTitle": "Từ trường và Nam châm điện",
    "lessonSlug": "tu-truong-nam-cham-dien",
    "contentMarkdown": "# Từ trường và Dòng điện\n\nKhông gian xung quanh nam châm hoặc xung quanh dòng điện tồn tại **từ trường**:\n- Từ trường tác dụng **lực từ** lên kim nam châm đặt trong nó.\n- **Đường sức từ**: Có chiều quy ước đi ra từ cực Bắc ($N$) và đi vào cực Nam ($S$) của nam châm: **\"Vào Nam Ra Bắc\"**.\n- **Quy tắc bàn tay phải**: Nắm bàn tay phải sao cho 4 ngón tay khum theo chiều dòng điện chạy qua các vòng dây của ống dây, thì ngón tay cái choãi ra chỉ chiều của đường sức từ trong lòng ống dây.\n- **Nam châm điện**: Gồm ống dây quấn quanh một lõi sắt non. Khi có dòng điện chạy qua, lõi sắt trở thành nam châm cực mạnh; khi ngắt điện, từ tính biến mất ngay lập tức (ứng dụng trong cần cẩu bốc dỡ sắt phế liệu).",
    "summary": "Từ trường tác dụng lực từ. Đường sức từ vào Nam ra Bắc. Nam châm điện có từ tính mạnh và điều khiển được bằng dòng điện.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Giúp học sinh hiểu mối liên hệ mật thiết giữa Điện và Từ, cơ sở của công nghệ rơ le tự động và chuông điện.",
      "misconceptions": [
        "Học sinh nghĩ nam châm điện dùng lõi thép sẽ tốt hơn lõi sắt non (thực tế lõi thép giữ từ tính lâu thành nam châm vĩnh cửu, không ngắt được lực từ khi cần).",
        "Nghĩ rằng từ trường có thể nhìn thấy trực tiếp bằng mắt thường mà không cần mạt sắt."
      ],
      "guiding_questions": [
        "Tại sao chiếc cần cẩu nam châm điện ở bến cảng có thể hút được một khối sắt nặng 5 tấn rồi lại thả rơi nó xuống thùng xe tải nhẹ nhàng?",
        "Làm thế nào để tăng lực từ của một chiếc nam châm điện tự chế?"
      ],
      "home_experiments": [
        {
          "title": "Tự chế nam châm điện mini từ chiếc đinh sắt",
          "materials": [
            "1 chiếc đinh sắt dài 6 cm",
            "1 mét dây đồng bọc men",
            "1 viên pin 1.5V",
            "Một ít ghim giấy sắt"
          ],
          "steps": [
            "Quấn dây đồng thật chặt quanh thân chiếc đinh sắt khoảng 50 vòng theo một chiều.",
            "Cạo sạch lớp men cách điện ở hai đầu dây.",
            "Nối 2 đầu dây vào 2 cực của pin và đưa đầu đinh lại gần ghim giấy sắt để quan sát đinh hút ghim.",
            "Ngắt một đầu dây khỏi pin và quan sát ghim giấy rơi xuống."
          ],
          "expected_outcome": "Khi có dòng điện, chiếc đinh hút chặt ghim giấy; ngắt dòng điện ghim rơi ra ngay lập tức.",
          "safety_notes": "Không nối pin liên tục quá lâu vì pin sẽ bị nóng."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Chiều của đường sức từ ở bên ngoài thanh nam châm được quy ước theo quy tắc nào sau đây?",
        "options": [
          {
            "id": "A",
            "text": "Đi ra từ cực Nam và đi vào cực Bắc"
          },
          {
            "id": "B",
            "text": "Đi ra từ cực Bắc và đi vào cực Nam (\"Vào Nam Ra Bắc\")"
          },
          {
            "id": "C",
            "text": "Luôn hướng thẳng đứng lên trời"
          },
          {
            "id": "D",
            "text": "Chạy vòng tròn khép kín không có cực"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Quy tắc ngắn gọn thường nhớ: \"Vào Nam Ra Bắc\"."
          }
        ],
        "explanation": "Quy ước chiều đường sức từ bên ngoài nam châm: đi ra từ cực Bắc (N) và đi vào cực Nam (S)."
      }
    ]
  },
  {
    "grade": 9,
    "tier": "middle",
    "topicTitle": "Cảm ứng điện từ & Dòng điện xoay chiều",
    "slug": "lop-9-cam-ung-dien-tu-xoay-chieu",
    "topicDescription": "Hiện tượng cảm ứng điện từ (Faraday), máy phát điện xoay chiều, máy biến thế và truyền tải điện năng đi xa.",
    "icon": "Activity",
    "lessonTitle": "Sáng tạo ra Dòng điện",
    "lessonSlug": "sang-tao-ra-dong-dien",
    "contentMarkdown": "# Hiện tượng cảm ứng điện từ\n\nNăm 1831, Michael Faraday khám phá ra hiện tượng làm thay đổi lịch sử nhân loại:\n- **Hiện tượng cảm ứng điện từ**: Khi số đường sức từ xuyên qua tiết diện của cuộn dây dẫn kín biến thiên (tăng lên hoặc giảm đi), trong cuộn dây xuất hiện dòng điện cảm ứng.\n- **Dòng điện xoay chiều** ($AC$): Là dòng điện có chiều luân phiên đổi ngược liên tục theo thời gian (dòng điện gia đình có tần số $50\\text{ Hz}$, đổi chiều 100 lần mỗi giây).\n- **Máy biến thế**: Thiết bị biến đổi hiệu điện thế xoay chiều:\n$$\\frac{U_1}{U_2} = \\frac{N_1}{N_2}$$\n- Trong truyền tải điện đi xa, người ta dùng máy tăng thế để tăng $U$ lên hàng trăm nghìn Vôn nhằm giảm hao phí do nhiệt lượng ($P_{hp} \\sim \\frac{1}{U^2}$).",
    "summary": "Cảm ứng điện từ biến cơ năng thành điện năng. Máy biến áp tuân theo tỷ số U1/U2 = N1/N2.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Giúp học sinh hiểu nguồn gốc dòng điện phát ra từ các nhà máy thủy điện/nhiệt điện và vì sao cần đường dây cao thế 500kV Bắc - Nam.",
      "misconceptions": [
        "Học sinh nghĩ nam châm cứ đứng yên trong cuộn dây là có dòng điện cảm ứng (phải có chuyển động làm biến thiên từ thông).",
        "Nghĩ máy biến thế có thể làm tăng cả hiệu điện thế lẫn cường độ dòng điện cùng lúc."
      ],
      "guiding_questions": [
        "Tại sao trên đường dây truyền tải điện Bắc - Nam người ta phải nâng hiệu điện thế lên tới $500\\,000\\text{ V}$ thay vì để $220\\text{ V}$ truyền đi?",
        "Chiếc máy phát điện mini gắn ở bánh xe đạp (đinamô) phát sáng bóng đèn nhờ nguyên lý vật lý nào?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát cấu tạo chiếc đinamô xe đạp hoặc quạt phát điện mini",
          "materials": [
            "1 chiếc mô-tơ đồ chơi DC nhỏ",
            "1 bóng đèn LED nhỏ gắn vào 2 đầu dây mô-tơ"
          ],
          "steps": [
            "Dùng tay quay thật nhanh trục của mô-tơ đồ chơi.",
            "Quan sát bóng đèn LED nối ở 2 cực."
          ],
          "expected_outcome": "Khi trục mô-tơ quay, cuộn dây quay trong từ trường nam châm sinh ra dòng điện làm bóng LED sáng nhấp nháy.",
          "safety_notes": "Quay trục bằng tay nhẹ nhàng không làm gãy chân đèn LED."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một máy biến thế có số vòng dây cuộn sơ cấp $N_1 = 4400\\text{ vòng}$ và cuộn thứ cấp $N_2 = 220\\text{ vòng}$. Khi đặt vào hai đầu cuộn sơ cấp hiệu điện thế $U_1 = 220\\text{ V}$, hiệu điện thế $U_2$ ở hai đầu cuộn thứ cấp là bao nhiêu Vôn (V)?",
        "latex_formula": "\\frac{U_1}{U_2} = \\frac{N_1}{N_2}",
        "correct_answer": "11",
        "numeric_tolerance": 0.02,
        "numeric_unit": "V",
        "difficulty": "medium",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Sử dụng hệ thức máy biến thế: $U_2 = U_1 \\cdot \\frac{N_2}{N_1}$."
          }
        ],
        "explanation": "Áp dụng công thức máy biến thế: $U_2 = U_1 \\cdot \\frac{N_2}{N_1} = 220 \\cdot \\frac{220}{4400} = 11\\text{ V}$."
      }
    ]
  },
  {
    "grade": 9,
    "tier": "middle",
    "topicTitle": "Khúc xạ ánh sáng và thấu kính hội tụ",
    "slug": "lop-9-khuc-xa-thau-kinh-hoi-tu",
    "topicDescription": "Hiện tượng khúc xạ ánh sáng, tiêu cự, quang tâm, dựng ảnh của vật qua thấu kính hội tụ (ảnh thật, ảnh ảo).",
    "icon": "Glasses",
    "lessonTitle": "Khúc xạ ánh sáng và Thấu kính",
    "lessonSlug": "khuc-xa-thau-kinh",
    "contentMarkdown": "# Khúc xạ và Thấu kính hội tụ\n\nHiện tượng tia sáng bị gãy khúc khi truyền xiên góc qua mặt phân cách giữa hai môi trường trong suốt gọi là **hiện tượng khúc xạ ánh sáng**:\n- Khi truyền từ không khí vào nước: góc khúc xạ $r$ nhỏ hơn góc tới $i$ ($r < i$).\n- **Thấu kính hội tụ**: Có phần rìa mỏng hơn phần giữa.\n- Các tia sáng đặc biệt qua thấu kính hội tụ:\n  1. Tia tới đi qua **quang tâm $O$** thì truyền thẳng.\n  2. Tia tới song song với **trục chính** thì tia ló đi qua **tiêu điểm $F'$**.\n  3. Tia tới đi qua **tiêu điểm $F$** thì tia ló song song với trục chính.\n- Công thức thấu kính:\n$$\\frac{1}{f} = \\frac{1}{d} + \\frac{1}{d'}$$\nỨng dụng: Kính lúp, ống nhòm, máy ảnh và khắc phục tật viễn thị, lão thị của mắt.",
    "summary": "Khúc xạ là sự gãy khúc của tia sáng. Thấu kính hội tụ hội tụ chùm sáng, tuân theo hệ thức 1/f = 1/d + 1/d'.",
    "durationMinutes": 20,
    "parentGuide": {
      "summary": "Giúp học sinh vẽ đường truyền 3 tia sáng đặc biệt qua thấu kính và hiểu nguyên lý hoạt động của chiếc kính lúp.",
      "misconceptions": [
        "Học sinh nhìn thấy chiếc đũa cắm trong cốc nước bị gãy khúc và nghĩ chiếc đũa bị bẻ gãy thật sự.",
        "Nhầm lẫn giữa ảnh thật (ngược chiều vật) và ảnh ảo (cùng chiều vật) qua thấu kính hội tụ."
      ],
      "guiding_questions": [
        "Tại sao khi con nhìn xuống đáy bể bơi nước trong veo, đáy bể luôn có cảm giác nông hơn so với độ sâu thực tế?",
        "Để dùng kính lúp quan sát một con kiến phóng to khổng lồ, con phải đặt con kiến trong khoảng tiêu cự hay ngoài khoảng tiêu cự của kính?"
      ],
      "home_experiments": [
        {
          "title": "Chiếc đũa bị bẻ gãy trong cốc nước",
          "materials": [
            "1 cốc thủy tinh trong suốt",
            "Nước sạch",
            "1 chiếc đũa ăn cơm"
          ],
          "steps": [
            "Đổ nước vào 2/3 cốc thủy tinh.",
            "Cắm chiếc đũa nghiêng vào cốc nước và quan sát từ mặt bên của cốc."
          ],
          "expected_outcome": "Chiếc đũa trông như bị gãy gập ngay tại mặt phân cách giữa không khí và nước do hiện tượng khúc xạ ánh sáng.",
          "safety_notes": "Thực hiện nhẹ nhàng không làm đổ cốc nước."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Đặc điểm nào sau đây là ĐÚNG đối với thấu kính hội tụ bằng thủy tinh trong không khí?",
        "options": [
          {
            "id": "A",
            "text": "Phần rìa dày hơn phần giữa"
          },
          {
            "id": "B",
            "text": "Phần giữa dày hơn phần rìa"
          },
          {
            "id": "C",
            "text": "Làm phân kỳ chùm tia sáng tới song song"
          },
          {
            "id": "D",
            "text": "Hoàn toàn không cho ánh sáng truyền qua"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Thấu kính hội tụ có hình dạng phồng ở giữa và mỏng dần về mép ngoài."
          }
        ],
        "explanation": "Thấu kính hội tụ có phần rìa mỏng hơn phần giữa, làm hội tụ chùm sáng tới song song."
      }
    ]
  },
  {
    "grade": 10,
    "tier": "high",
    "topicTitle": "Mô tả chuyển động: Độ dịch chuyển & Vận tốc",
    "slug": "lop-10-do-dich-chuyen-van-toc",
    "topicDescription": "Phân biệt quãng đường s và vectơ độ dịch chuyển d, vận tốc trung bình và tốc độ trung bình.",
    "icon": "TrendingUp",
    "lessonTitle": "Độ dịch chuyển và Vận tốc véctơ",
    "lessonSlug": "do-dich-chuyen-va-van-toc",
    "contentMarkdown": "# Chuyển động học chất điểm\n\nTrong vật lý cơ học chất điểm:\n- **Độ dịch chuyển** ($\\vec{d}$): Là một đại lượng véctơ nối vị trí đầu và vị trí cuối của chất điểm. Độ lớn của $\\vec{d}$ có thể bằng, nhỏ hơn quãng đường $s$ hoặc bằng 0 nếu vật quay về điểm xuất phát.\n- **Vận tốc** ($\\vec{v}$): Là đại lượng véctơ xác định hướng và tốc độ thay đổi vị trí của vật:\n$$\\vec{v} = \\frac{\\vec{d}}{\\Delta t}$$\n- **Tốc độ trung bình**: $v_{tb} = \\frac{s}{\\Delta t}$ (luôn dương).\n- Khi vật chuyển động thẳng không đổi chiều, độ dịch chuyển $d$ bằng quãng đường $s$, khi đó vận tốc có độ lớn bằng tốc độ.",
    "summary": "Độ dịch chuyển là véctơ nối điểm đầu và cuối. Vận tốc v = d/Delta_t biểu thị hướng và độ nhanh chuyển vị.",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Giúp học sinh phân biệt rạch ròi giữa quãng đường vô hướng và độ dịch chuyển có hướng vectơ trong chương trình GDPT 2018.",
      "misconceptions": [
        "Học sinh thường đồng nhất độ dịch chuyển với quãng đường đi được.",
        "Nghĩ rằng vận tốc và tốc độ là hai từ đồng nghĩa (tốc độ là độ lớn của vận tốc tức thời)."
      ],
      "guiding_questions": [
        "Một vận động viên bơi một vòng bể bơi dài 50 m từ bờ này sang bờ kia rồi bơi quay lại vạch xuất phát, độ dịch chuyển tổng cộng là bao nhiêu?",
        "Khi nào thì độ lớn của độ dịch chuyển bằng đúng quãng đường đi được?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát quỹ đạo và độ dịch chuyển đi bộ trong phòng",
          "materials": [
            "Thước dây đo",
            "Phấn hoặc băng dính đánh dấu sàn"
          ],
          "steps": [
            "Bước đi 4 mét theo hướng Bắc, sau đó rẽ vuông góc bước tiếp 3 mét theo hướng Đông.",
            "Đo quãng đường đi được: $s = 4 + 3 = 7\\text{ m}$.",
            "Dùng thước đo trực tiếp khoảng cách từ điểm xuất phát đến điểm kết thúc theo đường chim bay."
          ],
          "expected_outcome": "Độ dịch chuyển đo được bằng 5 mét (theo định lý Pytago $\\sqrt{4^2 + 3^2} = 5$), nhỏ hơn quãng đường 7 mét.",
          "safety_notes": "Thực hiện trong phòng trống tránh va vào bàn ghế."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một chất điểm chuyển động thẳng từ vị trí $x_1 = 2\\text{ m}$ đến vị trí $x_2 = 14\\text{ m}$ trong thời gian $\\Delta t = 3\\text{ s}$. Vận tốc của chất điểm là bao nhiêu m/s?",
        "latex_formula": "v = \\frac{x_2 - x_1}{\\Delta t}",
        "correct_answer": "4",
        "numeric_tolerance": 0.02,
        "numeric_unit": "m/s",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Độ dịch chuyển $d = x_2 - x_1 = 14 - 2 = 12\\text{ m}$. Sau đó lấy $v = \\frac{d}{\\Delta t}$."
          }
        ],
        "explanation": "Vận tốc tính bằng: $v = \\frac{x_2 - x_1}{\\Delta t} = \\frac{14 - 2}{3} = 4\\text{ m/s}$."
      }
    ]
  },
  {
    "grade": 10,
    "tier": "high",
    "topicTitle": "Chuyển động biến đổi đều & Rơi tự do",
    "slug": "lop-10-chuyen-dong-bien-doi-deu-roi-tu-do",
    "topicDescription": "Gia tốc a = (v - v0)/t, các phương trình chuyển động thẳng biến đổi đều và gia tốc trọng trường g.",
    "icon": "ArrowDownCircle",
    "lessonTitle": "Phương trình chuyển động biến đổi đều",
    "lessonSlug": "phuong-trinh-chuyen-dong-bien-doi-deu",
    "contentMarkdown": "# Chuyển động thẳng biến đổi đều\n\nChuyển động có quỹ đạo thẳng và vận tốc biến đổi đều theo thời gian:\n- **Gia tốc** ($a$):\n$$a = \\frac{v - v_0}{t}$$\nĐơn vị gia tốc: $m/s^2$.\n- Hệ phương trình động học:\n$$v = v_0 + a \\cdot t$$\n$$d = v_0 \\cdot t + \\frac{1}{2} a \\cdot t^2$$\n$$v^2 - v_0^2 = 2 \\cdot a \\cdot d$$\n- **Sự rơi tự do**: Là chuyển động rơi chỉ dưới tác dụng của trọng lực ($v_0 = 0, a = g \\approx 9.8\\text{ m/s}^2$). Mọi vật ở cùng một nơi đều rơi tự do với cùng gia tốc $g$ không phụ thuộc khối lượng.",
    "summary": "Chuyển động biến đổi đều có gia tốc a không đổi. Rơi tự do là chuyển động nhanh dần đều với gia tốc g.",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Giúp học sinh áp dụng thuần thục hệ 3 phương trình chuyển động thẳng biến đổi đều và hiểu bản chất thí nghiệm tháp nghiêng Pisa của Galileo.",
      "misconceptions": [
        "Học sinh thường nghĩ vật nặng rơi tự do nhanh hơn vật nhẹ (trong chân không hòn đá và chiếc lông chim rơi chạm đất cùng lúc).",
        "Quên hệ số 1/2 trong công thức tính độ dịch chuyển $d = v_0 t + \\frac{1}{2}at^2$."
      ],
      "guiding_questions": [
        "Nếu thả một tờ giấy phẳng và một hòn đá trong một ống thủy tinh đã hút chân không hoàn toàn, vật nào sẽ chạm đáy trước?",
        "Khi một chiếc xe máy hãm phanh chuyển động chậm dần đều, véctơ gia tốc cùng hướng hay ngược hướng với véctơ vận tốc?"
      ],
      "home_experiments": [
        {
          "title": "Đo thời gian phản xạ bằng chiếc thước rơi tự do",
          "materials": [
            "1 chiếc thước kẻ nhựa dài 30 cm"
          ],
          "steps": [
            "Bố mẹ cầm đầu trên của thước giơ thẳng đứng.",
            "Con xòe ngón cái và ngón trỏ chờ sẵn ở vạch số 0 (không chạm vào thước).",
            "Bố mẹ bất ngờ buông tay cho thước rơi tự do, con chộp thật nhanh giữ thước lại.",
            "Ghi lại vạch centimet $h$ (m) nơi ngón tay bắt được thước, tính thời gian phản xạ $t = \\sqrt{\\frac{2h}{g}}$."
          ],
          "expected_outcome": "Tính được thời gian phản xạ thần kinh của học sinh (thường khoảng 0.15 - 0.20 giây).",
          "safety_notes": "Thao tác nhẹ nhàng không làm rơi gãy thước."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một ô tô đang chuyển động với vận tốc ban đầu $v_0 = 10\\text{ m/s}$ thì tăng ga chuyển động nhanh dần đều với gia tốc $a = 2\\text{ m/s}^2$. Sau thời gian $t = 5\\text{ s}$, vận tốc $v$ của ô tô đạt bao nhiêu m/s?",
        "latex_formula": "v = v_0 + a \\cdot t",
        "correct_answer": "20",
        "numeric_tolerance": 0.02,
        "numeric_unit": "m/s",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Áp dụng công thức $v = v_0 + a \\cdot t$ với $v_0 = 10$, $a = 2$, $t = 5$."
          }
        ],
        "explanation": "Vận tốc đạt được: $v = 10 + 2 \\cdot 5 = 20\\text{ m/s}$."
      }
    ]
  },
  {
    "grade": 10,
    "tier": "high",
    "topicTitle": "Các lực cơ học: Hấp dẫn, Đàn hồi & Ma sát",
    "slug": "lop-10-cac-luc-co-hoc-tu-nhien",
    "topicDescription": "Định luật vạn vật hấp dẫn của Newton, định luật Hooke lò xo F = k.|Delta_l| và hệ số ma sát trượt mu.",
    "icon": "Anchor",
    "lessonTitle": "Bản chất các lực cơ học trong tự nhiên",
    "lessonSlug": "ban-chat-luc-co-hoc",
    "contentMarkdown": "# Các lực cơ học cơ bản\n\nTrong tự nhiên có các lực cơ học chi phối chuyển động:\n- **Định luật vạn vật hấp dẫn**: Hai chất điểm hút nhau bằng lực tỷ lệ thuận với tích khối lượng và tỷ lệ nghịch với bình phương khoảng cách:\n$$F_{hd} = G \\cdot \\frac{m_1 \\cdot m_2}{r^2}$$\nHằng số hấp dẫn $G \\approx 6.67 \\times 10^{-11}\\text{ N} \\cdot \\text{m}^2/\\text{kg}^2$.\n- **Lực đàn hồi (Định luật Hooke)**: Trong giới hạn đàn hồi, lực đàn hồi của lò xo tỷ lệ thuận với độ biến dạng:\n$$F_{dh} = k \\cdot |\\Delta l|$$\nVới $k$ là độ cứng lò xo ($N/m$), $\\Delta l = l - l_0$ là độ dãn hoặc nén.\n- **Lực ma sát trượt**: $F_{mst} = \\mu \\cdot N$ (với $\\mu$ là hệ số ma sát trượt, $N$ là áp lực vuông góc).",
    "summary": "Lực hấp dẫn gắn liền với khối lượng. Lực đàn hồi F = k.|Delta_l| tỉ lệ với độ biến dạng. Ma sát trượt F = mu.N.",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Giúp học sinh vẽ và phân tích giản đồ lực (Free Body Diagram) tác dụng lên vật thể trong trạng thái cân bằng hoặc chuyển động có gia tốc.",
      "misconceptions": [
        "Học sinh thường nghĩ lò xo càng dài thì độ cứng k càng lớn (thực tế cắt đôi lò xo thì độ cứng tăng gấp đôi).",
        "Nghĩ rằng hệ số ma sát trượt có đơn vị là Niutơn (hệ số ma sát là số không có thứ nguyên)."
      ],
      "guiding_questions": [
        "Nếu kéo một lò xo có độ cứng $k = 100\\text{ N/m}$ dãn ra một đoạn $2\\text{ cm}$, lực đàn hồi sinh ra có độ lớn bằng bao nhiêu Niutơn?",
        "Tại sao lực hấp dẫn giữa hai học sinh ngồi cạnh nhau trong lớp lại không làm cho hai bạn bị hút dính vào nhau?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát độ dãn của dây chun theo định luật Hooke",
          "materials": [
            "1 sợi dây cao su dẻo",
            "1 chiếc móc treo nhỏ",
            "Thước đo milimét",
            "Các đồng xu có khối lượng bằng nhau"
          ],
          "steps": [
            "Treo dây cao su lên giá, đo chiều dài ban đầu $l_0$.",
            "Treo 1 đồng xu, đo độ dãn $\\Delta l_1$.",
            "Treo 2 đồng xu, đo độ dãn $\\Delta l_2$.",
            "So sánh tỷ số giữa trọng lượng tăng thêm và độ dãn tương ứng."
          ],
          "expected_outcome": "Độ dãn tỷ lệ thuận với số lượng đồng xu treo vào, nghiệm đúng định luật Hooke trong giới hạn đàn hồi.",
          "safety_notes": "Không treo vật quá nặng làm đứt dây cao su."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một lò xo có độ cứng $k = 200\\text{ N/m}$. Khi treo một vật nặng vào, lò xo dãn ra một đoạn $\\Delta l = 0.03\\text{ m}$. Lực đàn hồi của lò xo lúc này có độ lớn bằng bao nhiêu Niutơn (N)?",
        "latex_formula": "F_{dh} = k \\cdot \\Delta l",
        "correct_answer": "6",
        "numeric_tolerance": 0.02,
        "numeric_unit": "N",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Áp dụng định luật Hooke: $F_{dh} = k \\cdot \\Delta l$ với $k = 200$ và $\\Delta l = 0.03$."
          }
        ],
        "explanation": "Độ lớn lực đàn hồi: $F_{dh} = k \\cdot \\Delta l = 200 \\cdot 0.03 = 6\\text{ N}$."
      }
    ]
  },
  {
    "grade": 10,
    "tier": "high",
    "topicTitle": "Năng lượng, công và bảo toàn cơ năng",
    "slug": "lop-10-bao-toan-co-nang",
    "topicDescription": "Công cơ học A = F.s.cos(alpha), động năng Wd = 1/2.m.v^2, thế năng trọng trường Wt = mgh và bảo toàn cơ năng.",
    "icon": "BatteryCharging",
    "lessonTitle": "Định luật bảo toàn cơ năng",
    "lessonSlug": "dinh-luat-bao-toan-co-nang",
    "contentMarkdown": "# Cơ năng và Định luật bảo toàn\n\nCơ năng là tổng của động năng và thế năng của vật:\n- **Công của lực không đổi**:\n$$A = F \\cdot s \\cdot \\cos\\alpha$$\nVới $\\alpha$ là góc hợp bởi véctơ lực $\\vec{F}$ và véctơ độ dịch chuyển $\\vec{s}$.\n- **Động năng**:\n$$W_d = \\frac{1}{2} m \\cdot v^2$$\n- **Thế năng trọng trường**:\n$$W_t = m \\cdot g \\cdot h$$\n- **Định luật bảo toàn cơ năng**: Khi một vật chỉ chịu tác dụng của trọng lực (hoặc lực đàn hồi), cơ năng của vật là một đại lượng bảo toàn:\n$$W = W_d + W_t = \\frac{1}{2} m \\cdot v^2 + m \\cdot g \\cdot h = \\text{hằng số}$$\nỨng dụng: Tàu lượn siêu tốc lao dốc, con lắc đơn, nhảy cầu bungee.",
    "summary": "Cơ năng W = Wd + Wt bảo toàn khi vật chỉ chịu lực thế. Thế năng chuyển hóa hoàn toàn thành động năng và ngược lại.",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Dạy học sinh phương pháp giải bài toán cơ học bằng định luật bảo toàn năng lượng thay vì dùng định luật Newton phức tạp.",
      "misconceptions": [
        "Học sinh quên rằng thế năng phụ thuộc vào việc chọn mốc tính thế năng ($h = 0$).",
        "Nghĩ rằng khi có ma sát cơ năng vẫn được bảo toàn (khi có ma sát, một phần cơ năng biến thành nhiệt năng)."
      ],
      "guiding_questions": [
        "Khi một vận động viên trượt ván lao từ đỉnh đồi cao xuống thung lũng rồi vọt lên đồi đối diện, vị trí nào vận tốc lớn nhất?",
        "Tại sao trên đường ray tàu lượn siêu tốc, đỉnh dốc đầu tiên luôn phải được thiết kế cao nhất so với tất cả các đỉnh dốc phía sau?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát bảo toàn cơ năng với viên bi lăn trên máng dốc",
          "materials": [
            "1 đoạn ống nhựa chữ U hoặc máng trượt uốn cong",
            "1 viên bi sắt"
          ],
          "steps": [
            "Thả viên bi từ độ cao $h$ ở nhánh bên trái của máng (không vận tốc đầu).",
            "Quan sát độ cao cực đại $h'$ mà viên bi leo lên được ở nhánh bên phải."
          ],
          "expected_outcome": "Viên bi leo lên độ cao gần bằng $h$ ban đầu, minh họa sự bảo toàn cơ năng (thế năng ban đầu chuyển thành động năng rồi lại chuyển thành thế năng).",
          "safety_notes": "Giữ máng trượt vững vàng trên mặt bàn."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một vật có khối lượng $m = 2\\text{ kg}$ rơi tự do từ độ cao $h = 5\\text{ m}$ xuống mặt đất (lấy $g = 10\\text{ m/s}^2$, bỏ qua sức cản không khí, chọn gốc thế năng tại mặt đất). Cơ năng của vật là bao nhiêu Jun (J)?",
        "latex_formula": "W = m \\cdot g \\cdot h",
        "correct_answer": "100",
        "numeric_tolerance": 0.02,
        "numeric_unit": "J",
        "difficulty": "medium",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Tại vị trí ban đầu $v = 0$ nên cơ năng $W = W_t = m \\cdot g \\cdot h$."
          }
        ],
        "explanation": "Cơ năng của vật: $W = m \\cdot g \\cdot h = 2 \\cdot 10 \\cdot 5 = 100\\text{ J}$."
      }
    ]
  },
  {
    "grade": 10,
    "tier": "high",
    "topicTitle": "Động lượng & Định luật bảo toàn động lượng",
    "slug": "lop-10-dong-luong-va-cham",
    "topicDescription": "Véctơ động lượng p = m.v, hệ kín, bảo toàn động lượng trong va chạm và chuyển động phản lực của tên lửa.",
    "icon": "Crosshair",
    "lessonTitle": "Động lượng và Chuyển động phản lực",
    "lessonSlug": "dong-luong-phan-luc",
    "contentMarkdown": "# Động lượng và Va chạm\n\nĐộng lượng là đại lượng véctơ đặc trưng cho khả năng truyền tương tác chuyển động của một vật:\n- **Véctơ động lượng**:\n$$\\vec{p} = m \\cdot \\vec{v}$$\nĐơn vị động lượng: $kg \\cdot m/s$ hoặc $N \\cdot s$.\n- **Định luật bảo toàn động lượng**: Trong một hệ kín (không có ngoại lực tác dụng hoặc tổng ngoại lực triệt tiêu), tổng động lượng của hệ là một đại lượng bảo toàn:\n$$\\vec{p}_1 + \\vec{p}_2 = \\vec{p}'_1 + \\vec{p}'_2$$\n- **Chuyển động bằng phản lực**: Khi tên lửa phun khí phụt mạnh về phía sau với vận tốc lớn, thân tên lửa sẽ thu được vận tốc lao vút về phía trước theo nguyên lý bảo toàn động lượng:\n$$m_{tenlua} \\cdot \\vec{v}_{tenlua} + m_{khi} \\cdot \\vec{v}_{khi} = \\vec{0}$$",
    "summary": "Động lượng p = m.v. Trong hệ kín, tổng động lượng bảo toàn. Ứng dụng giải bài toán va chạm và phóng tên lửa.",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Giúp học sinh làm quen với phương pháp véctơ trong va chạm cơ học và nguyên lý hoạt động của động cơ phản lực hàng không vũ trụ.",
      "misconceptions": [
        "Học sinh thường cộng đại số độ lớn động lượng thay vì cộng véctơ theo đúng phương hướng chuyển động.",
        "Nghĩ rằng tên lửa bay được trong không gian là nhờ luồng khí đẩy vào không khí bên ngoài (thực tế tên lửa bay trong chân không còn nhanh hơn vì không có lực cản)."
      ],
      "guiding_questions": [
        "Khi một khẩu súng bắn đạn về phía trước, tại sao báng súng lại bị giật mạnh lùi về phía sau vào vai người bắn?",
        "Làm thế nào các phi thuyền không gian có thể chuyển hướng bay giữa chân không vũ trụ bao la?"
      ],
      "home_experiments": [
        {
          "title": "Chiếc tên lửa bóng bay phản lực trên dây cước",
          "materials": [
            "1 quả bóng bay dài",
            "1 đoạn ống hút nhựa ngắn 5 cm",
            "1 sợi dây cước dài 3 mét",
            "Băng dính"
          ],
          "steps": [
            "Luồn sợi dây cước qua ống hút, buộc căng dây ngang phòng.",
            "Thổi căng quả bóng bay và dùng tay kẹp chặt miệng bóng (không buộc nút).",
            "Dùng băng dính dán quả bóng vào ống hút sao cho miệng bóng hướng về phía sau.",
            "Buông tay thả miệng bóng và quan sát tên lửa bóng bay lao vút đi."
          ],
          "expected_outcome": "Khí phụt ra đằng sau làm quả bóng bay lao vút về phía trước theo định luật bảo toàn động lượng.",
          "safety_notes": "Kéo căng dây cước chắc chắn."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một viên đạn có khối lượng $m = 0.02\\text{ kg}$ bay với vận tốc $v = 600\\text{ m/s}$. Độ lớn động lượng $p$ của viên đạn là bao nhiêu kg.m/s?",
        "latex_formula": "p = m \\cdot v",
        "correct_answer": "12",
        "numeric_tolerance": 0.02,
        "numeric_unit": "kg.m/s",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Áp dụng công thức $p = m \\cdot v$ với $m = 0.02$ và $v = 600$."
          }
        ],
        "explanation": "Độ lớn động lượng: $p = m \\cdot v = 0.02 \\cdot 600 = 12\\text{ kg} \\cdot \\text{m/s}$."
      }
    ]
  },
  {
    "grade": 11,
    "tier": "high",
    "topicTitle": "Phương trình dao động, con lắc lò xo & con lắc đơn",
    "slug": "lop-11-con-lac-lo-xo-con-lac-don",
    "topicDescription": "Phương trình li độ x, vận tốc v, gia tốc a, chu kỳ dao động con lắc lò xo T = 2.pi.sqrt(m/k) và con lắc đơn.",
    "icon": "Clock",
    "lessonTitle": "Động học Dao động điều hòa",
    "lessonSlug": "dong-hoc-dao-dong-dieu-hoa",
    "contentMarkdown": "# Động học Dao động điều hòa\n\nDao động điều hòa là dao động có li độ là hàm cosin của thời gian:\n- Phương trình dao động:\n$$x = A \\cdot \\cos(\\omega t + \\varphi)$$\n- Phương trình vận tốc:\n$$v = x' = -\\omega A \\cdot \\sin(\\omega t + \\varphi) = \\omega A \\cdot \\cos(\\omega t + \\varphi + \\frac{\\pi}{2})$$\nVận tốc sớm pha $\\frac{\\pi}{2}$ so với li độ. Giá trị cực đại $v_{max} = \\omega A$ tại vị trí cân bằng ($x = 0$).\n- Phương trình gia tốc:\n$$a = v' = -\\omega^2 A \\cdot \\cos(\\omega t + \\varphi) = -\\omega^2 x$$\nGia tốc ngược pha so với li độ. Giá trị cực đại $a_{max} = \\omega^2 A$ tại hai biên ($x = \\pm A$).\n- Chu kỳ con lắc lò xo: $T = 2\\pi \\sqrt{\\frac{m}{k}}$\n- Chu kỳ con lắc đơn: $T = 2\\pi \\sqrt{\\frac{l}{g}}$",
    "summary": "Dao động điều hòa có li độ, vận tốc, gia tốc biến thiên điều hòa theo thời gian với độ lệch pha tương ứng.",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Giúp học sinh vẽ đường tròn lượng giác Fresnel để xác định pha dao động, li độ và vận tốc tức thời.",
      "misconceptions": [
        "Học sinh thường nghĩ khi vật đi qua vị trí cân bằng (x = 0) thì gia tốc đạt giá trị cực đại (thực tế a = 0 vì a = -w^2.x).",
        "Nghĩ biên độ dao động càng lớn thì chu kỳ con lắc lò xo càng dài (chu kỳ độc lập với biên độ)."
      ],
      "guiding_questions": [
        "Tại sao chiếc đồng hồ quả lắc treo tường chạy nhanh chậm khi thời tiết chuyển mùa từ hè nóng sang đông lạnh?",
        "Tại vị trí cân bằng của con lắc lò xo, li độ bằng bao nhiêu và vận tốc có độ lớn như thế nào?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát tính chu kỳ của con lắc đơn tại nhà",
          "materials": [
            "1 sợi dây dài chính xác 1 mét",
            "1 quả cầu nặng nhỏ",
            "Đồng hồ bấm giây"
          ],
          "steps": [
            "Buộc vật nặng vào dây, kéo lệch góc nhỏ $5^\\circ$ rồi buông tay.",
            "Đo thời gian thực hiện 10 dao động toàn phần.",
            "Chia 10 để tính chu kỳ thực nghiệm $T$, so sánh với công thức lý thuyết $T = 2\\pi\\sqrt{\\frac{1}{9.8}} \\approx 2.0\\text{ s}$."
          ],
          "expected_outcome": "Chu kỳ đo được xấp xỉ đúng 2.0 giây, nghiệm đúng công thức con lắc đơn chu kỳ giây.",
          "safety_notes": "Treo chắc chắn tránh tuột móc treo."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một chất điểm dao động điều hòa với biên độ $A = 5\\text{ cm}$ và tần số góc $\\omega = 10\\text{ rad/s}$. Tốc độ cực đại $v_{max}$ của chất điểm khi đi qua vị trí cân bằng là bao nhiêu cm/s?",
        "latex_formula": "v_{max} = \\omega \\cdot A",
        "correct_answer": "50",
        "numeric_tolerance": 0.02,
        "numeric_unit": "cm/s",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Tốc độ cực đại tại vị trí cân bằng tính bằng: $v_{max} = \\omega \\cdot A$."
          }
        ],
        "explanation": "Tốc độ cực đại: $v_{max} = \\omega \\cdot A = 10 \\cdot 5 = 50\\text{ cm/s}$."
      }
    ]
  },
  {
    "grade": 11,
    "tier": "high",
    "topicTitle": "Năng lượng dao động & Hiện tượng cộng hưởng",
    "slug": "lop-11-nang-luong-dao-dong-cong-huong",
    "topicDescription": "Cơ năng W = 1/2.k.A^2, sự chuyển hóa động năng - thế năng, dao động tắt dần, dao động cưỡng bức và cộng hưởng.",
    "icon": "Radio",
    "lessonTitle": "Cơ năng và Hiện tượng Cộng hưởng",
    "lessonSlug": "co-nang-va-cong-huong",
    "contentMarkdown": "# Năng lượng dao động và Cộng hưởng\n\nTrong dao động điều hòa của con lắc lò xo:\n- **Động năng**: $W_d = \\frac{1}{2} m v^2 = \\frac{1}{2} m \\omega^2 A^2 \\sin^2(\\omega t + \\varphi)$\n- **Thế năng**: $W_t = \\frac{1}{2} k x^2 = \\frac{1}{2} k A^2 \\cos^2(\\omega t + \\varphi)$\n- **Cơ năng bảo toàn**:\n$$W = W_d + W_t = \\frac{1}{2} k A^2 = \\frac{1}{2} m \\omega^2 A^2 = \\text{hằng số}$$\nĐộng năng và thế năng biến thiên tuần hoàn với tần số góc $2\\omega$ và chu kỳ $\\frac{T}{2}$.\n- **Hiện tượng cộng hưởng**: Khi tần số của ngoại lực cưỡng bức $f$ bằng tần số dao động riêng $f_0$ của hệ ($f = f_0$), biên độ dao động cưỡng bức tăng vọt đạt giá trị cực đại. Ứng dụng: Bộ cộng hưởng âm thanh đàn ghi-ta; cần tránh cộng hưởng làm sập cầu, nứt vỡ công trình.",
    "summary": "Cơ năng tỉ lệ với bình phương biên độ W ~ A^2. Hiện tượng cộng hưởng xảy ra khi tần số cưỡng bức bằng tần số riêng.",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Giúp học sinh hiểu tại sao một đoàn quân khi hành quân qua cầu treo phải đổi bước đi không đều để tránh cộng hưởng phá hủy cầu.",
      "misconceptions": [
        "Học sinh nghĩ động năng và thế năng dao động cùng tần số với li độ (thực tế tần số gấp đôi).",
        "Nghĩ rằng hiện tượng cộng hưởng luôn gây hại (thực tế hộp đàn ghita, máy đo địa chấn rất cần cộng hưởng)."
      ],
      "guiding_questions": [
        "Tại sao giọng hát cực cao của ca sĩ opera có thể làm vỡ tan chiếc ly thủy tinh mỏng đặt trên bàn?",
        "Cơ năng của con lắc lò xo biến đổi như thế nào nếu biên độ dao động tăng lên gấp 2 lần?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát cộng hưởng với hai con lắc cùng chiều dài",
          "materials": [
            "2 con lắc đơn có chiều dài dây bằng nhau 40 cm",
            "1 sợi dây giăng ngang nối 2 con lắc"
          ],
          "steps": [
            "Treo 2 con lắc lên cùng một sợi dây giăng ngang.",
            "Kéo 1 con lắc dao động, con lắc thứ hai ban đầu đứng yên.",
            "Quan sát năng lượng truyền qua dây giăng làm con lắc thứ hai dao động mạnh dần lên."
          ],
          "expected_outcome": "Con lắc thứ hai hấp thụ năng lượng và dao động với biên độ cực đại vì cùng tần số riêng (hiện tượng cộng hưởng).",
          "safety_notes": "Giăng dây chắc chắn."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Hiện tượng cộng hưởng cơ học xảy ra khi điều kiện nào sau đây được thỏa mãn?",
        "options": [
          {
            "id": "A",
            "text": "Tần số của ngoại lực cưỡng bức bằng tần số dao động riêng của hệ"
          },
          {
            "id": "B",
            "text": "Biên độ dao động giảm dần về số 0"
          },
          {
            "id": "C",
            "text": "Hệ hoàn toàn không có ma sát với môi trường"
          },
          {
            "id": "D",
            "text": "Gia tốc của vật luôn luôn bằng hằng số"
          }
        ],
        "correct_answer": "A",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Sự ăn khớp về mặt tần số giữa lực kích thích bên ngoài và dao động nội tại của hệ."
          }
        ],
        "explanation": "Cộng hưởng xảy ra khi tần số ngoại lực cưỡng bức bằng tần số dao động riêng của hệ ($f = f_0$)."
      }
    ]
  },
  {
    "grade": 11,
    "tier": "high",
    "topicTitle": "Sóng cơ, giao thoa sóng và sóng dừng",
    "slug": "lop-11-giao-thoa-song-song-dung",
    "topicDescription": "Bước sóng lambda = v/f, phương trình sóng, điều kiện cực đại cực tiểu giao thoa và sóng dừng trên sợi dây.",
    "icon": "Wifi",
    "lessonTitle": "Giao thoa Sóng và Sóng dừng",
    "lessonSlug": "giao-thoa-song-va-song-dung",
    "contentMarkdown": "# Hiện tượng Sóng cơ học\n\nSóng cơ là sự lan truyền dao động trong môi trường vật chất theo thời gian:\n- **Bước sóng** ($\\lambda$): Là quãng đường sóng truyền đi trong một chu kỳ:\n$$\\lambda = v \\cdot T = \\frac{v}{f}$$\n- **Giao thoa sóng**: Hai sóng kết hợp gặp nhau tạo nên các vân cực đại xen kẽ các vân cực tiểu:\n  - Cực đại giao thoa: $d_2 - d_1 = k \\cdot \\lambda$ ($k \\in \\mathbb{Z}$).\n  - Cực tiểu giao thoa: $d_2 - d_1 = (k + 0.5) \\cdot \\lambda$.\n- **Sóng dừng**: Tạo bởi sự giao thoa giữa sóng tới và sóng phản xạ trên cùng phương truyền:\n  - Nút sóng: Điểm đứng yên không dao động.\n  - Bụng sóng: Điểm dao động với biên độ cực đại ($2A$).\n  - Khoảng cách giữa hai nút liên tiếp (hoặc hai bụng liên tiếp) bằng nửa bước sóng: $\\frac{\\lambda}{2}$.\n  - Dây hai đầu cố định: Chiều dài dây thỏa mãn $l = k \\cdot \\frac{\\lambda}{2}$ ($k$ là số bụng sóng).",
    "summary": "Bước sóng lambda = v/f. Giao thoa tạo vân cực đại, cực tiểu. Sóng dừng có các nút và bụng sóng xen kẽ cách nhau lambda/2.",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Giúp học sinh liên hệ hiện tượng sóng dừng với nguyên lý phát âm thanh trên dây đàn ghi-ta, vĩ cầm và sáo trúc.",
      "misconceptions": [
        "Học sinh nhầm lẫn tốc độ truyền sóng (vận tốc lan truyền pha) với tốc độ dao động của các phần tử vật chất.",
        "Nghĩ khoảng cách giữa 2 nút sóng liên tiếp là một bước sóng (chính xác là nửa bước sóng lambda/2)."
      ],
      "guiding_questions": [
        "Khi người nghệ sĩ gảy dây đàn ghita, dạng sóng hình thành trên sợi dây đàn là sóng chạy hay sóng dừng?",
        "Khoảng cách giữa hai điểm đứng yên (hai nút sóng) liên tiếp trên sợi dây có sóng dừng bằng bao nhiêu phần bước sóng?"
      ],
      "home_experiments": [
        {
          "title": "Tạo sóng dừng trên sợi dây cao su co dãn",
          "materials": [
            "1 sợi dây chun dệt dài 2 mét",
            "Móc cố định một đầu vào tay nắm cửa"
          ],
          "steps": [
            "Cầm đầu kia của dây, kéo căng vừa phải.",
            "Vung tay lên xuống nhịp nhàng với tần số tăng dần.",
            "Quan sát khi đạt tần số thích hợp, trên dây xuất hiện các múi sóng dừng cố định với các nút đứng yên và bụng dao động phồng to."
          ],
          "expected_outcome": "Học sinh nhìn thấy tận mắt các nút sóng và bụng sóng hình thành ổn định trên dây.",
          "safety_notes": "Cầm chắc đầu dây."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một sóng cơ lan truyền với tần số $f = 50\\text{ Hz}$ và tốc độ truyền sóng $v = 150\\text{ m/s}$. Bước sóng $\\lambda$ của sóng này là bao nhiêu mét (m)?",
        "latex_formula": "\\lambda = \\frac{v}{f}",
        "correct_answer": "3",
        "numeric_tolerance": 0.02,
        "numeric_unit": "m",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Áp dụng công thức tính bước sóng: $\\lambda = \\frac{v}{f}$ với $v = 150$ và $f = 50$."
          }
        ],
        "explanation": "Bước sóng tính bằng: $\\lambda = \\frac{v}{f} = \\frac{150}{50} = 3\\text{ m}$."
      }
    ]
  },
  {
    "grade": 11,
    "tier": "high",
    "topicTitle": "Điện trường, điện thế và tụ điện",
    "slug": "lop-11-dien-truong-tu-dien",
    "topicDescription": "Cường độ điện trường E = F/q = U/d, điện thế, hiệu điện thế và điện dung của tụ điện C = Q/U.",
    "icon": "ZapOff",
    "lessonTitle": "Điện trường tĩnh và Tụ điện",
    "lessonSlug": "dien-truong-va-tu-dien",
    "contentMarkdown": "# Điện trường và Tụ điện\n\nKhông gian xung quanh điện tích tồn tại điện trường:\n- **Cường độ điện trường** ($\\vec{E}$): Đặc trưng cho tác dụng lực của điện trường:\n$$E = \\frac{F}{|q|}$$\nTrong điện trường đều giữa hai bản kim loại tích điện trái dấu phẳng song song:\n$$E = \\frac{U}{d}$$\nĐơn vị: Vôn trên mét ($V/m$).\n- **Tụ điện**: Hệ gồm hai vật dẫn đặt gần nhau và ngăn cách nhau bằng một lớp điện môi, có nhiệm vụ tích và phóng điện tích:\n$$C = \\frac{Q}{U}$$\nTrong đó:\n- $Q$ là điện tích của tụ (đơn vị: Culông, $C$).\n- $U$ là hiệu điện thế giữa hai bản tụ (đơn vị: Vôn, $V$).\n- $C$ là điện dung của tụ (đơn vị: Fara, $F$).\n- Năng lượng điện trường tích trữ trong tụ: $W = \\frac{1}{2} C U^2 = \\frac{1}{2} \\frac{Q^2}{C}$.",
    "summary": "Điện trường tác dụng lực lên điện tích. Trong điện trường đều E = U/d. Tụ điện tích trữ năng lượng W = 1/2.C.U^2.",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Giúp học sinh hiểu cấu tạo tụ điện trong mạch điện tử tử, đèn flash điện thoại và nguyên lý phóng tia sét trong cơn dông.",
      "misconceptions": [
        "Học sinh nghĩ tụ điện lưu trữ điện tích vĩnh viễn như pin hóa học.",
        "Nhầm lẫn chiều đường sức điện trường (đi ra từ điện tích dương, đi vào điện tích âm)."
      ],
      "guiding_questions": [
        "Tia sét khổng lồ chớp sáng trong cơn mưa dông phóng điện qua chất cách điện không khí theo nguyên lý nào?",
        "Để tăng khả năng tích điện của tụ điện ở cùng một hiệu điện thế, người ta cần tăng đại lượng nào của tụ?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát điện trường tĩnh điện bằng quả bóng bay cọ xát",
          "materials": [
            "1 quả bóng bay cao su",
            "Mảnh vải len khô",
            "Dòng nước nhỏ chảy từ vòi bồn rửa"
          ],
          "steps": [
            "Thổi căng quả bóng bay, cọ xát mạnh vào mảnh vải len nhiều lần để nhiễm điện.",
            "Mở vòi nước cho một dòng nước nhỏ chảy êm thẳng đứng.",
            "Đưa quả bóng nhiễm điện lại gần dòng nước (cách 1 - 2 cm)."
          ],
          "expected_outcome": "Dòng nước bị uốn cong lệch về phía quả bóng dưới tác dụng của lực điện trường tĩnh điện.",
          "safety_notes": "Không làm ướt quả bóng trước khi thí nghiệm."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Giữa hai bản kim loại phẳng song song cách nhau một khoảng $d = 0.02\\text{ m}$ có hiệu điện thế $U = 100\\text{ V}$. Cường độ điện trường đều $E$ giữa hai bản là bao nhiêu V/m?",
        "latex_formula": "E = \\frac{U}{d}",
        "correct_answer": "5000",
        "numeric_tolerance": 0.02,
        "numeric_unit": "V/m",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Áp dụng công thức điện trường đều: $E = \\frac{U}{d}$ với $U = 100\\text{ V}$ và $d = 0.02\\text{ m}$."
          }
        ],
        "explanation": "Cường độ điện trường: $E = \\frac{U}{d} = \\frac{100}{0.02} = 5000\\text{ V/m}$."
      }
    ]
  },
  {
    "grade": 11,
    "tier": "high",
    "topicTitle": "Dòng điện không đổi & Định luật Ohm toàn mạch",
    "slug": "lop-11-dinh-luat-ohm-toan-mach",
    "topicDescription": "Suất điện động E và điện trở trong r của nguồn, định luật Ohm toàn mạch I = E/(R + r), hiệu suất nguồn điện.",
    "icon": "Cpu",
    "lessonTitle": "Định luật Ohm cho toàn mạch",
    "lessonSlug": "dinh-luat-ohm-toan-mach",
    "contentMarkdown": "# Toàn mạch điện và Suất điện động\n\nNguồn điện duy trì hiệu điện thế ổn định để dòng điện chạy liên tục:\n- **Nguồn điện**: Đặc trưng bởi **suất điện động** ($\\mathcal{E}$, đơn vị Vôn) và **điện trở trong** ($r$, đơn vị Ôm).\n- **Định luật Ohm cho toàn mạch**: Cường độ dòng điện chạy trong mạch kín tỷ lệ thuận với suất điện động của nguồn và tỷ lệ nghịch với điện trở toàn phần:\n$$I = \\frac{\\mathcal{E}}{R_N + r}$$\nTrong đó:\n- $R_N$ là điện trở tương đương của mạch ngoài.\n- $r$ là điện trở trong của nguồn điện.\n- **Hiệu điện thế mạch ngoài**:\n$$U_N = I \\cdot R_N = \\mathcal{E} - I \\cdot r$$\n- **Hiện tượng đoản mạch (ngắn mạch)**: Xảy ra khi nối tắt hai cực của nguồn bằng dây dẫn có điện trở rất nhỏ ($R_N \\approx 0$), khi đó dòng điện tăng vọt $I = \\frac{\\mathcal{E}}{r}$ gây nóng bốc cháy nguồn điện.",
    "summary": "Định luật Ohm toàn mạch: I = E/(RN + r). Khi RN = 0 xảy ra hiện tượng đoản mạch nguy hiểm.",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Giúp học sinh hiểu tại sao một viên pin cũ đo không tải thì đủ 1.5V nhưng khi lắp vào đồ chơi lại không chạy được (do điện trở trong r tăng vọt).",
      "misconceptions": [
        "Học sinh thường quên tính điện trở trong r của nguồn khi tính dòng điện trong mạch.",
        "Nghĩ rằng hiệu điện thế mạch ngoài Un luôn luôn bằng suất điện động E trong mọi trường hợp."
      ],
      "guiding_questions": [
        "Hiện tượng đoản mạch (chập điện) trong gia đình nguy hiểm như thế nào và thiết bị nào giúp ngắt mạch tự động?",
        "Khi một chiếc xe ô tô đề nổ máy khởi động, tại sao đèn pha phía trước bị mờ tối đi trong chốc lát?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát hiện tượng tụt áp của quả pin cũ bằng đồng hồ vạn năng",
          "materials": [
            "1 viên pin 9V cũ",
            "1 đồng hồ đo VOM",
            "1 điện trở tải 100 Ôm"
          ],
          "steps": [
            "Đo hiệu điện thế hai cực của pin khi chưa nối tải (đo suất điện động $\\mathcal{E}$).",
            "Nối điện trở tải vào hai cực của pin và đo lại hiệu điện thế mạch ngoài $U_N$."
          ],
          "expected_outcome": "Hiệu điện thế $U_N$ bị sụt giảm rõ rệt so với $\\mathcal{E}$ do độ sụt áp $I \\cdot r$ trên điện trở trong của pin.",
          "safety_notes": "Không đoản mạch trực tiếp pin 9V."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một nguồn điện có suất điện động $\\mathcal{E} = 12\\text{ V}$ và điện trở trong $r = 1\\,\\Omega$ nối với mạch ngoài có điện trở $R_N = 5\\,\\Omega$. Cường độ dòng điện $I$ trong mạch là bao nhiêu Ampe (A)?",
        "latex_formula": "I = \\frac{\\mathcal{E}}{R_N + r}",
        "correct_answer": "2",
        "numeric_tolerance": 0.02,
        "numeric_unit": "A",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Áp dụng định luật Ohm toàn mạch: $I = \\frac{\\mathcal{E}}{R_N + r}$ với $\\mathcal{E} = 12$, $R_N = 5$, $r = 1$."
          }
        ],
        "explanation": "Cường độ dòng điện: $I = \\frac{\\mathcal{E}}{R_N + r} = \\frac{12}{5 + 1} = 2\\text{ A}$."
      }
    ]
  },
  {
    "grade": 12,
    "tier": "high",
    "topicTitle": "Phương trình trạng thái khí lý tưởng",
    "slug": "lop-12-phuong-trinh-khi-ly-tuong",
    "topicDescription": "Các định luật chất khí (Boyle-Mariotte, Charles) và phương trình tổng quát pV/T = hằng số, pV = nRT.",
    "icon": "Box",
    "lessonTitle": "Thuyết động học và Khí lý tưởng",
    "lessonSlug": "phuong-trinh-khi-ly-tuong",
    "contentMarkdown": "# Phương trình trạng thái khí lý tưởng\n\nKhí lý tưởng là mô hình khí mà các phân tử được coi là chất điểm và chỉ tương tác khi va chạm:\n- Các quá trình biến đổi trạng thái đặc biệt:\n  - **Quá trình đẳng nhiệt** (Nhiệt độ $T$ không đổi - Định luật Boyle - Mariotte):\n$$p_1 \\cdot V_1 = p_2 \\cdot V_2$$\n  - **Quá trình đẳng tích** (Thể tích $V$ không đổi - Định luật Charles):\n$$\\frac{p_1}{T_1} = \\frac{p_2}{T_2}$$\n  - **Quá trình đẳng áp** (Áp suất $p$ không đổi - Định luật Gay - Lussac):\n$$\\frac{V_1}{T_1} = \\frac{V_2}{T_2}$$\n- **Phương trình Clapeyron - Mendeleev**:\n$$p \\cdot V = n \\cdot R \\cdot T = \\frac{m}{M} R \\cdot T$$\nTrong đó:\n- $p$ là áp suất (đơn vị: $Pa$ hoặc $atm$).\n- $V$ là thể tích ($m^3$).\n- $T = t(^\\circ\\text{C}) + 273.15$ là nhiệt độ tuyệt đối (Kenvin, $K$).\n- $R \\approx 8.31\\text{ J/(mol} \\cdot \\text{K)}$ là hằng số khí lý tưởng.",
    "summary": "Phương trình trạng thái: pV/T = const. Đẳng nhiệt pV = const, đẳng tích p/T = const, đẳng áp V/T = const.",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Giúp học sinh luôn nhớ đổi nhiệt độ sang Kenvin (T = t + 273) trong tất cả các bài toán chất khí.",
      "misconceptions": [
        "Học sinh thường quên đổi độ C sang Kenvin dẫn đến giải sai toàn bộ các bài toán đẳng tích và đẳng áp.",
        "Nghĩ rằng nhiệt độ 0 độ C là phân tử khí đã ngừng chuyển động hoàn toàn (0 K = -273.15 độ C mới là độ không tuyệt đối)."
      ],
      "guiding_questions": [
        "Tại sao săm lốp xe máy bơm căng để ngoài sân bê tông nắng gắt mùa hè lại rất dễ bị nổ lốp?",
        "Khi nhúng quả bóng bàn bị bẹp móp vào bát nước sôi nóng, điều gì làm quả bóng tự phồng căng trở lại?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát định luật Charles với vỏ chai nhựa trong tủ lạnh",
          "materials": [
            "1 chai nhựa rỗng có nắp kín",
            "Ngăn đá tủ lạnh"
          ],
          "steps": [
            "Mở nắp chai nhựa ở nhiệt độ phòng, vặn nắp thật chặt.",
            "Cho chai vào ngăn đá tủ lạnh trong 30 phút.",
            "Lấy chai ra quan sát thành chai."
          ],
          "expected_outcome": "Thành chai bị móp méo co dúm lại do nhiệt độ giảm làm áp suất và thể tích khí bên trong giảm theo.",
          "safety_notes": "Thực hiện đơn giản, an toàn."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Một khối khí lý tưởng trong xilanh có thể tích ban đầu $V_1 = 4\\text{ lít}$ ở áp suất $p_1 = 1\\text{ atm}$. Nén đẳng nhiệt khối khí này đến thể tích $V_2 = 2\\text{ lít}$. Áp suất $p_2$ của khối khí sau khi nén là bao nhiêu atm?",
        "latex_formula": "p_2 = \\frac{p_1 \\cdot V_1}{V_2}",
        "correct_answer": "2",
        "numeric_tolerance": 0.02,
        "numeric_unit": "atm",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Áp dụng định luật Boyle - Mariotte cho quá trình đẳng nhiệt: $p_1 \\cdot V_1 = p_2 \\cdot V_2$."
          }
        ],
        "explanation": "Áp suất sau khi nén: $p_2 = \\frac{p_1 \\cdot V_1}{V_2} = \\frac{1 \\cdot 4}{2} = 2\\text{ atm}$."
      }
    ]
  },
  {
    "grade": 12,
    "tier": "high",
    "topicTitle": "Nội năng & Định luật I nhiệt động lực học",
    "slug": "lop-12-noi-nang-nhiet-dong-luc-hoc",
    "topicDescription": "Khái niệm nội năng U, hai cách làm biến đổi nội năng (thực hiện công, truyền nhiệt) và định luật Delta_U = A + Q.",
    "icon": "ThermometerSnowflake",
    "lessonTitle": "Nguyên lý I Nhiệt động lực học",
    "lessonSlug": "nguyen-ly-i-nhiet-dong-luc-hoc",
    "contentMarkdown": "# Nội năng và Nguyên lý I Nhiệt động lực học\n\nNội năng của một vật là tổng động năng chuyển động hỗn loạn của các phân tử và thế năng tương tác giữa chúng:\n$$U = f(T, V)$$\n- Có 2 cách làm biến đổi nội năng:\n  1. **Thực hiện công**: Cọ xát đồng xu lên mặt bàn làm đồng xu nóng lên, ấn pít-tông nén khí.\n  2. **Truyền nhiệt**: Đun nóng nước trên ngọn lửa, thả thìa nguội vào cốc nước nóng.\n- **Định luật I Nhiệt động lực học**: Độ biến thiên nội năng của vật bằng tổng công và nhiệt lượng mà vật nhận được:\n$$\\Delta U = A + Q$$\n- **Quy ước dấu**:\n  - $Q > 0$: Hệ nhận nhiệt lượng; $Q < 0$: Hệ truyền nhiệt lượng.\n  - $A > 0$: Hệ nhận công; $A < 0$: Hệ thực hiện công lên vật khác.",
    "summary": "Độ biến thiên nội năng Delta_U = A + Q. Quy ước dấu: nhận thì dương (+), truyền/sinh công thì âm (-).",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Giúp học sinh nắm vững quy ước dấu của A và Q để giải chính xác bài toán động cơ nhiệt và máy làm lạnh trong kỳ thi tốt nghiệp.",
      "misconceptions": [
        "Học sinh hay nhầm dấu khi đề bài nói: \"khí giãn nở sinh công\" (phải lấy A < 0 khi xét cho khối khí).",
        "Nghĩ rằng nhiệt độ của khí tăng thì bắt buộc hệ phải nhận nhiệt lượng Q (thực tế nén đoạn nhiệt Q = 0 nhiệt độ vẫn tăng vọt)."
      ],
      "guiding_questions": [
        "Khi con bơm xe đạp, tại sao sờ vào phần dưới của chiếc bơm con thấy thân bơm nóng ran lên?",
        "Một khối khí nhận nhiệt lượng $100\\text{ J}$ và sinh công $60\\text{ J}$ đẩy pít-tông, nội năng của khối khí tăng hay giảm bao nhiêu Jun?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát biến thiên nội năng bằng cách uốn bẻ dây thép",
          "materials": [
            "1 đoạn dây thép mềm hoặc chiếc kẹp ghim giấy lớn"
          ],
          "steps": [
            "Dùng hai tay bẻ gập qua gập lại liên tục chiếc kẹp giấy tại một điểm khoảng 20 lần thật nhanh.",
            "Chạm nhẹ ngay đầu ngón tay vào vị trí vừa bẻ gập."
          ],
          "expected_outcome": "Chỗ gập nóng ran lên do cơ năng thực hiện công uốn kim loại chuyển hóa thành nội năng làm tăng nhiệt độ.",
          "safety_notes": "Chạm nhẹ tay cẩn thận tránh bỏng rát da."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Người ta truyền cho khối khí trong xilanh một nhiệt lượng $Q = 150\\text{ J}$. Khối khí dãn nở thực hiện một công $A' = 50\\text{ J}$ đẩy pít-tông lên. Độ biến thiên nội năng $\\Delta U$ của khối khí là bao nhiêu Jun (J)?",
        "latex_formula": "\\Delta U = Q + A",
        "correct_answer": "100",
        "numeric_tolerance": 0.02,
        "numeric_unit": "J",
        "difficulty": "medium",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Khối khí sinh công nên $A = -A' = -50\\text{ J}$. Áp dụng $\\Delta U = A + Q = -50 + 150$."
          }
        ],
        "explanation": "Khối khí nhận nhiệt $Q = 150\\text{ J}$ và sinh công nên $A = -50\\text{ J}$. Độ biến thiên nội năng: $\\Delta U = 150 - 50 = 100\\text{ J}$."
      }
    ]
  },
  {
    "grade": 12,
    "tier": "high",
    "topicTitle": "Từ trường & Cảm ứng điện từ: Định luật Faraday và Lenz",
    "slug": "lop-12-dinh-luat-faraday-lenz",
    "topicDescription": "Từ thông Phi = B.S.cos(alpha), định luật Faraday ec = -Delta_Phi/Delta_t, định luật Lenz và hiện tượng tự cảm L.",
    "icon": "Magnet",
    "lessonTitle": "Định luật Cảm ứng điện từ Faraday và Lenz",
    "lessonSlug": "dinh-luat-faraday-va-lenz",
    "contentMarkdown": "# Hiện tượng Cảm ứng điện từ định lượng\n\nNền tảng của toàn bộ nền công nghiệp điện năng hiện đại:\n- **Từ thông** ($\\Phi$): Đo số lượng đường sức từ xuyên qua diện tích mạch kín:\n$$\\Phi = B \\cdot S \\cdot \\cos\\alpha$$\nTrong đó $\\alpha$ là góc giữa véctơ cảm ứng từ $\\vec{B}$ và véctơ pháp tuyến $\\vec{n}$. Đơn vị: Vêbe ($Wb$).\n- **Định luật Faraday**: Độ lớn của suất điện động cảm ứng trong mạch kín tỷ lệ với tốc độ biến thiên từ thông:\n$$e_c = -\\frac{\\Delta\\Phi}{\\Delta t}$$\n- **Định luật Lenz**: Dòng điện cảm ứng xuất hiện có chiều sao cho từ trường do nó sinh ra có tác dụng chống lại sự biến thiên của từ thông sinh ra nó.\n- **Hiện tượng tự cảm**: Là hiện tượng cảm ứng điện từ xảy ra trong chính mạch có dòng điện biến thiên:\n$$e_{tc} = -L \\cdot \\frac{\\Delta i}{\\Delta t}$$\nVới $L$ là hệ số tự cảm của ống dây (đơn vị: Hen-ri, $H$).",
    "summary": "Từ thông Phi = B.S.cos(alpha). Suất điện động cảm ứng ec = -Delta_Phi/Delta_t tuân theo định luật Lenz chống lại sự biến thiên.",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Giúp học sinh vận dụng định luật Lenz để xác định chiều dòng điện cảm ứng và hiểu nguyên lý hoạt động của bếp từ gia đình.",
      "misconceptions": [
        "Học sinh thường nhầm góc alpha là góc giữa B và mặt phẳng khung dây (phải là góc giữa B và pháp tuyến vuông góc n).",
        "Nghĩ rằng từ thông lớn thì suất điện động phải lớn (ec chỉ phụ thuộc tốc độ biến thiên chứ không phụ thuộc giá trị tuyệt đối của Phi)."
      ],
      "guiding_questions": [
        "Tại sao bếp từ khi bật lên chỉ làm nóng xoong nồi có đáy bằng kim loại nhiễm từ còn mặt kính bếp thì không hề nóng rực?",
        "Khi đưa cực Bắc của thanh nam châm lại gần một vòng dây nhôm kín, vòng dây nhôm sẽ bị hút lại hay bị đẩy lùi ra xa?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát dòng điện Foucault cản trở chuyển động",
          "materials": [
            "1 ống đồng hoặc ống nhôm dày rỗng",
            "1 viên nam châm đất hiếm Neodymium mạnh",
            "1 viên bi sắt thường cùng kích thước"
          ],
          "steps": [
            "Thả viên bi sắt rơi qua lòng ống đồng (rơi vụt xuống đất trong 0.2 giây).",
            "Thả viên nam châm đất hiếm rơi qua lòng ống đồng và quan sát."
          ],
          "expected_outcome": "Viên nam châm rơi từ từ lơ lửng mất 3 - 4 giây mới ra khỏi ống vì dòng điện Foucault sinh ra trong thành ống đồng tạo lực từ cản trở sự rơi theo định luật Lenz.",
          "safety_notes": "Cẩn thận không để kẹp ngón tay với nam châm đất hiếm mạnh."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Từ thông qua một khung dây dẫn kín giảm đều từ $\\Phi_1 = 0.8\\text{ Wb}$ xuống $\\Phi_2 = 0.2\\text{ Wb}$ trong khoảng thời gian $\\Delta t = 0.1\\text{ s}$. Độ lớn suất điện động cảm ứng xuất hiện trong khung dây là bao nhiêu Vôn (V)?",
        "latex_formula": "|e_c| = \\left| \\frac{\\Delta\\Phi}{\\Delta t} \\right|",
        "correct_answer": "6",
        "numeric_tolerance": 0.02,
        "numeric_unit": "V",
        "difficulty": "medium",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Độ biến thiên từ thông $|\\Delta\\Phi| = |0.2 - 0.8| = 0.6\\text{ Wb}$. Sau đó chia cho $\\Delta t = 0.1\\text{ s}$."
          }
        ],
        "explanation": "Độ lớn suất điện động cảm ứng: $|e_c| = \\frac{|0.2 - 0.8|}{0.1} = 6\\text{ V}$."
      }
    ]
  },
  {
    "grade": 12,
    "tier": "high",
    "topicTitle": "Cấu tạo hạt nhân, năng lượng liên kết & Độ hụt khối",
    "slug": "lop-12-nang-luong-lien-ket-hat-nhan",
    "topicDescription": "Ký hiệu hạt nhân, proton, neutron, độ hụt khối Delta_m và năng lượng liên kết Elk = Delta_m.c^2.",
    "icon": "Atom",
    "lessonTitle": "Cấu tạo Hạt nhân và Năng lượng liên kết",
    "lessonSlug": "cau-tao-hat-nhan-nang-luong-lien-ket",
    "contentMarkdown": "# Vật lý Hạt nhân nguyên tử\n\nHạt nhân nguyên tử nằm ở tâm nguyên tử, tích điện dương:\n- Cấu tạo hạt nhân:\n  - $Z$ prôtôn mang điện tích $+e$.\n  - $N$ nơtrôn không mang điện ($N = A - Z$).\n  - $A$ nuclôn (số khối): Ký hiệu hạt nhân là $^{A}_{Z}X$.\n- **Hệ thức Einstein về năng lượng**:\n$$E = m \\cdot c^2$$\n- **Độ hụt khối** ($\\Delta m$): Khối lượng của hạt nhân luôn nhỏ hơn tổng khối lượng của các nuclôn riêng lẻ tạo thành nó:\n$$\\Delta m = [Z \\cdot m_p + (A - Z)m_n] - m_X$$\n- **Năng lượng liên kết** ($E_{lk}$): Năng lượng tỏa ra khi các nuclôn liên kết tạo thành hạt nhân:\n$$E_{lk} = \\Delta m \\cdot c^2$$\n- **Năng lượng liên kết riêng**: $\\frac{E_{lk}}{A}$ đặc trưng cho mức độ bền vững của hạt nhân (hạt nhân có số khối $50 < A < 95$ như sắt $^{56}_{26}Fe$ bền vững nhất).",
    "summary": "Độ hụt khối Delta_m = tổng khối lượng nucleon trừ khối lượng hạt nhân. Năng lượng liên kết Elk = Delta_m.c^2.",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Giúp học sinh hiểu nguồn gốc năng lượng khổng lồ của phản ứng hạt nhân xuất phát từ sự biến đổi một lượng khối lượng cực nhỏ theo hệ thức Einstein.",
      "misconceptions": [
        "Học sinh nghĩ định luật bảo toàn khối lượng cổ điển đúng trong phản ứng hạt nhân (trong hạt nhân khối lượng không bảo toàn, chỉ có năng lượng toàn phần bảo toàn).",
        "Nghĩ rằng hạt nhân càng nhiều nuclon thì càng bền vững (chính năng lượng liên kết riêng Elk/A mới quyết định độ bền vững)."
      ],
      "guiding_questions": [
        "Hệ thức nổi tiếng nhất lịch sử nhân loại của Albert Einstein $E = mc^2$ có ý nghĩa vật lý như thế nào?",
        "Tại sao Mặt Trời có thể tỏa ra năng lượng ánh sáng và nhiệt khổng lồ sưởi ấm toàn bộ hệ Mặt Trời suốt hàng tỷ năm qua?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát bảng hệ thống tuần hoàn các nguyên tố hạt nhân",
          "materials": [
            "Bảng hệ thống tuần hoàn các nguyên tố hóa học",
            "Sổ tay ghi chép"
          ],
          "steps": [
            "Tìm nguyên tố Heli $^{4}_{2}He$, xác định số proton Z = 2 và số neutron N = 4 - 2 = 2.",
            "Tìm nguyên tố Sắt $^{56}_{26}Fe$, xác định Z = 26 và N = 30.",
            "So sánh tỷ lệ số neutron trên proton khi số khối A tăng dần."
          ],
          "expected_outcome": "Học sinh nhận thấy ở các hạt nhân nặng, số nơtrôn tăng nhanh hơn số prôtôn để tạo lực hạt nhân kéo các prôtôn lại gần nhau.",
          "safety_notes": "Thực hành tính toán giải bài tập lý thuyết an toàn."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Đại lượng vật lý nào sau đây đặc trưng cho mức độ BỀN VỮNG của một hạt nhân nguyên tử?",
        "options": [
          {
            "id": "A",
            "text": "Năng lượng liên kết riêng (Elk / A)"
          },
          {
            "id": "B",
            "text": "Tổng số proton trong hạt nhân"
          },
          {
            "id": "C",
            "text": "Khối lượng toàn phần của hạt nhân"
          },
          {
            "id": "D",
            "text": "Kích thước hình học của nguyên tử"
          }
        ],
        "correct_answer": "A",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Năng lượng liên kết tính trên một đơn vị nuclôn (hạt nhân có đại lượng này càng lớn thì càng bền vững)."
          }
        ],
        "explanation": "Năng lượng liên kết riêng $\\frac{E_{lk}}{A}$ là đại lượng đặc trưng cho độ bền vững của hạt nhân."
      }
    ]
  },
  {
    "grade": 12,
    "tier": "high",
    "topicTitle": "Phóng xạ, phân hạch và phản ứng nhiệt hạch",
    "slug": "lop-12-phong-xa-phan-hach-nhiet-hach",
    "topicDescription": "Định luật phóng xạ N(t) = N0.2^(-t/T), chu kỳ bán rã, tia phóng xạ, phân hạch hạt nhân và phản ứng nhiệt hạch.",
    "icon": "AlertTriangle",
    "lessonTitle": "Phóng xạ và Năng lượng Hạt nhân",
    "lessonSlug": "phong-xa-va-nang-luong-hat-nhan",
    "contentMarkdown": "# Phóng xạ và Phản ứng Hạt nhân\n\nPhóng xạ là quá trình hạt nhân không bền vững tự phân rã và phát ra các tia phóng xạ:\n- Các loại tia phóng xạ:\n  - **Tia $\\alpha$** (dòng hạt nhân $^{4}_{2}He$): Khả năng ion hóa mạnh, đâm xuyên kém (bị tờ giấy chặn lại).\n  - **Tia $\\beta^-$** (dòng electron $^{0}_{-1}e$) và **tia $\\beta^+$** (dòng pozitron $^{0}_{1}e$): Đâm xuyên trung bình (bị lá nhôm dày vài mm chặn lại).\n  - **Tia $\\gamma$** (sóng điện từ bước sóng cực ngắn): Đâm xuyên cực mạnh, cần tấm chì dày vài chục cm để che chắn.\n- **Định luật phóng xạ**:\n$$N(t) = N_0 \\cdot 2^{-\\frac{t}{T}} = N_0 \\cdot e^{-\\lambda t}$$\nVới $T$ là **chu kỳ bán rã** (thời gian để một nửa số hạt nhân bị phân rã), $\\lambda = \\frac{\\ln 2}{T}$ là hằng số phóng xạ.\n- **Phân hạch**: Hạt nhân rất nặng (Uranium $^{235}U$) bắt nơtrôn chậm vỡ thành 2 hạt nhân nhẹ hơn và tỏa năng lượng lớn (lò phản ứng hạt nhân).\n- **Nhiệt hạch**: Kết hợp 2 hạt nhân rất nhẹ thành hạt nhân nặng hơn ở nhiệt độ hàng trăm triệu độ (trong lòng Mặt Trời, bom H).",
    "summary": "Định luật phóng xạ: N(t) = N0.2^(-t/T). Phân hạch tách hạt nhân nặng, nhiệt hạch kết hợp hạt nhân nhẹ tỏa năng lượng siêu lớn.",
    "durationMinutes": 25,
    "parentGuide": {
      "summary": "Giúp học sinh hiểu ứng dụng bức xạ trong y học (chụp X-quang, xạ trị ung thư), phương pháp định tuổi cổ vật bằng carbon C-14 và an toàn bức xạ.",
      "misconceptions": [
        "Học sinh nghĩ sau thời gian 2 chu kỳ bán rã (t = 2T) thì chất phóng xạ phân rã hết 100% (thực tế còn lại 25%).",
        "Nghĩ rằng mọi chất phóng xạ đều nguy hiểm chết người ngay lập tức."
      ],
      "guiding_questions": [
        "Làm thế nào các nhà khảo cổ học có thể xác định được tuổi của một xác ướp Ai Cập cổ đại đã chôn cất cách đây 3000 năm bằng đồng vị carbon C-14?",
        "Tại sao năng lượng nhiệt hạch được coi là nguồn năng lượng tương lai sạch và an toàn hơn năng lượng phân hạch hạt nhân?"
      ],
      "home_experiments": [
        {
          "title": "Mô phỏng chu kỳ bán rã bằng tung đồng xu ngẫu nhiên",
          "materials": [
            "50 đồng xu nhỏ giống nhau (hoặc 50 viên kẹo hai mặt)",
            "1 chiếc khay lớn"
          ],
          "steps": [
            "Cho 50 đồng xu vào khay (số hạt nhân ban đầu $N_0 = 50$).",
            "Lắc đều và tung xuống bàn. Các đồng xu ngửa coi như đã phân rã thì nhặt ra ngoài.",
            "Đếm số đồng xu sấp còn lại ($N_1$).",
            "Lặp lại thêm 3 lần nữa và ghi lại đồ thị số lượng đồng xu còn lại theo số lần tung."
          ],
          "expected_outcome": "Sau mỗi lần tung, số lượng đồng xu còn lại xấp xỉ giảm đi một nửa (50 -> 25 -> 12 -> 6), minh họa trực quan định luật phân rã phóng xạ hàm mũ.",
          "safety_notes": "Thực hành vui vẻ, an toàn."
        }
      ]
    },
    "questions": [
      {
        "question_type": "numeric",
        "prompt": "Chất phóng xạ có chu kỳ bán rã $T = 8\\text{ ngày}$. Ban đầu có $N_0 = 1000\\text{ g}$ chất phóng xạ nguyên chất. Sau thời gian $t = 24\\text{ ngày}$, khối lượng chất phóng xạ còn lại chưa bị phân rã là bao nhiêu gam (g)?",
        "latex_formula": "m(t) = m_0 \\cdot 2^{-\\frac{t}{T}}",
        "correct_answer": "125",
        "numeric_tolerance": 0.02,
        "numeric_unit": "g",
        "difficulty": "medium",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Số chu kỳ bán rã đã trôi qua: $k = \\frac{t}{T} = \\frac{24}{8} = 3$. Sau 3 chu kỳ, khối lượng còn lại bằng $\\frac{m_0}{2^3} = \\frac{1000}{8}$."
          }
        ],
        "explanation": "Khối lượng còn lại sau 3 chu kỳ bán rã: $m = \\frac{1000}{2^3} = \\frac{1000}{8} = 125\\text{ g}$."
      }
    ]
  }
];
