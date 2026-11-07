// D:\k12_physics_web_app\scripts\append_grades_8_to_12.js
const fs = require('fs');
const path = require('path');
const katex = require('katex');

const topicsPart3 = [
  // ==========================================
  // GRADE 8 (Middle - 4 topics)
  // ==========================================
  {
    grade: 8,
    tier: 'middle',
    topicTitle: 'Áp suất chất rắn và áp suất khí quyển',
    slug: 'lop-8-ap-suat-chat-ran-khi-quyen',
    topicDescription: 'Công thức áp suất p = F/S, áp lực, nguyên lý bình thông nhau và áp suất khí quyển.',
    icon: 'Compass',
    lessonTitle: 'Áp lực và Áp suất',
    lessonSlug: 'ap-luc-va-ap-suat',
    contentMarkdown: `# Khái niệm áp lực và áp suất

Áp lực là lực ép có phương vuông góc với mặt bị ép:
- **Áp suất** ($p$) là độ lớn của áp lực trên một đơn vị diện tích bị ép:
$$p = \\frac{F}{S}$$
Trong đó:
- $F$ là áp lực tác dụng (đơn vị: Niutơn, $N$).
- $S$ là diện tích bị ép (đơn vị: mét vuông, $m^2$).
- $p$ là áp suất (đơn vị: Paxcan, $Pa$ hoặc $N/m^2$).
- Để tăng áp suất: Tăng áp lực $F$ hoặc giảm diện tích $S$ (ví dụ: mài sắc lưỡi dao, đầu đinh nhọn).
- Để giảm áp suất: Giảm áp lực $F$ hoặc tăng diện tích $S$ (ví dụ: bánh xích xe tăng bản rộng để không bị lún bùn).`,
    summary: 'Áp suất p = F/S đo tác dụng của áp lực lên diện tích bị ép. Muốn tăng áp suất thì giảm diện tích tiếp xúc.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Giúp học sinh hiểu tại sao lưỡi dao sắc thì dễ cắt gọt và tại sao xe tải nặng cần nhiều bánh lốp to bản.',
      misconceptions: [
        'Học sinh thường đồng nhất áp lực với áp suất (nghĩ lực lớn thì áp suất bắt buộc phải lớn, quên mất diện tích tiếp xúc).',
        'Nghĩ rằng không khí không có trọng lượng nên không tạo ra áp suất khí quyển.'
      ],
      guiding_questions: [
        'Tại sao mũi của chiếc kim khâu và đầu chiếc đinh đóng tường luôn phải được mài rất nhọn?',
        'Vì sao chiếc xe máy xúc đất nặng hàng chục tấn lại chạy bằng dải xích to bản thay vì bánh lốp cao su nhỏ?'
      ],
      home_experiments: [
        {
          title: 'Khảo sát áp suất với ngón tay và chiếc bút bi',
          materials: ['1 chiếc bút bi có nắp bấm'],
          steps: [
            'Dùng hai ngón tay trỏ ép vào hai đầu của chiếc bút bi (một đầu nhọn, một đầu tù to bản).',
            'Giữ lực ép bằng nhau ở cả hai ngón tay trong 5 giây.',
            'Cảm nhận ngón tay nào bị đau và lõm sâu hơn.'
          ],
          expected_outcome: 'Ngón tay ở đầu nhọn bị đau và lõm sâu hơn nhiều vì diện tích tiếp xúc nhỏ sinh ra áp suất rất lớn.',
          safety_notes: 'Chỉ ép nhẹ tay vừa đủ cảm nhận, không ấn quá mạnh làm xước da.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một khối gỗ có trọng lượng $F = 400\\text{ N}$ đặt đứng trên mặt bàn. Diện tích mặt tiếp xúc với bàn là $S = 0.05\\text{ m}^2$. Áp suất khối gỗ tác dụng lên mặt bàn là bao nhiêu Pa?',
        latex_formula: 'p = \\frac{F}{S}',
        correct_answer: '8000',
        numeric_tolerance: 0.02,
        numeric_unit: 'Pa',
        difficulty: 'medium',
        points: 10,
        hints: [
          { level: 1, hint: 'Áp dụng công thức $p = \\frac{F}{S}$ với $F = 400$ và $S = 0.05$.' }
        ],
        explanation: 'Áp suất tính bằng công thức: $p = \\frac{F}{S} = \\frac{400}{0.05} = 8000\\text{ Pa}$.'
      }
    ]
  },
  {
    grade: 8,
    tier: 'middle',
    topicTitle: 'Tác dụng làm quay của lực và đòn bẩy',
    slug: 'lop-8-tac-dung-lam-quay-don-bay',
    topicDescription: 'Quy tắc mômen lực, trục quay và ứng dụng đòn bẩy trong đời sống (kéo cắt, xà beng, bập bênh).',
    icon: 'Repeat',
    lessonTitle: 'Đòn bẩy và Mômen lực',
    lessonSlug: 'don-bay-momen-luc',
    contentMarkdown: `# Tác dụng làm quay của lực

Khi một lực tác dụng vào vật có trục quay cố định, lực có thể làm cho vật quay:
- **Tác dụng làm quay** phụ thuộc vào:
  - Độ lớn của lực tác dụng.
  - Khoảng cách từ trục quay đến giá của lực (gọi là cánh tay đòn).
- **Quy tắc đòn bẩy**: Lực càng cách xa trục quay thì tác dụng làm quay càng mạnh, giúp ta nâng được vật nặng với lực kéo nhỏ hơn.
- Ứng dụng: Chiếc kéo cắt kim loại có cán dài lưỡi ngắn; xà beng bẩy hòn đá tảng; chiếc kìm mở nắp chai nước ngọt.`,
    summary: 'Lực làm quay vật quanh trục. Đòn bẩy có cánh tay đòn càng dài thì lực tác dụng cần thiết càng nhỏ.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Giúp học sinh hiểu câu nói nổi tiếng của Archimedes: "Hãy cho tôi một điểm tựa, tôi sẽ nhấc bổng cả Trái Đất".',
      misconceptions: [
        'Học sinh nghĩ lực cứ lớn là vật quay nhanh mà không để ý đến khoảng cách từ tay cầm đến bản lề cửa.',
        'Nghĩ rằng đòn bẩy cho ta lợi cả về lực lẫn về đường đi.'
      ],
      guiding_questions: [
        'Tại sao tay nắm cửa phòng luôn được gắn ở mép ngoài xa bản lề nhất có thể thay vì gắn sát bản lề?',
        'Để cắt một thanh sắt cứng dễ dàng, con nên chọn chiếc kìm có cán dài hay cán ngắn?'
      ],
      home_experiments: [
        {
          title: 'Thử thách đẩy cửa mở ở các vị trí khác nhau',
          materials: ['Cánh cửa phòng ngủ có bản lề quay trơn tru'],
          steps: [
            'Dùng 1 ngón tay đẩy cánh cửa mở ra tại vị trí tay nắm cửa mép ngoài cùng (rất nhẹ nhàng).',
            'Chuyển ngón tay vào vị trí sát bản lề cách 5 cm rồi dùng lực đẩy cánh cửa mở ra.'
          ],
          expected_outcome: 'Đẩy sát bản lề tốn nhiều sức hơn rất nhiều so với đẩy ở mép ngoài, chứng minh cánh tay đòn càng dài tác dụng làm quay càng lớn.',
          safety_notes: 'Không để tay vào khe hở bản lề tránh kẹp ngón tay.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Để mở một chiếc nắp chai nước ngọt bằng khui nắp chai (đòn bẩy), người ta nên làm gì để bẩy nắp nhẹ nhất?',
        options: [
          { id: 'A', text: 'Cầm tay sát vào đầu mở nắp của khui' },
          { id: 'B', text: 'Cầm tay ở đuôi cán khui cách xa điểm tựa nhất' },
          { id: 'C', text: 'Dùng một lực kéo hướng thẳng đứng vào giữa chai' },
          { id: 'D', text: 'Đun nóng cả chai nước ngọt' }
        ],
        correct_answer: 'B',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Cánh tay đòn càng dài thì lực cần tác dụng càng nhỏ.' }
        ],
        explanation: 'Cầm ở đuôi cán làm tăng cánh tay đòn, tạo mômen quay lớn giúp bẩy nắp chai nhẹ nhàng.'
      }
    ]
  },
  {
    grade: 8,
    tier: 'middle',
    topicTitle: 'Công cơ học và công suất',
    slug: 'lop-8-cong-co-hoc-cong-suat',
    topicDescription: 'Công thức công cơ học A = F.s, công suất P = A/t và ý nghĩa công suất của máy móc (Oát, Mã lực).',
    icon: 'Briefcase',
    lessonTitle: 'Công cơ học và Công suất máy',
    lessonSlug: 'cong-co-hoc-cong-suat-may',
    contentMarkdown: `# Công cơ học và Công suất

Trong vật lý, công cơ học chỉ xuất hiện khi có lực tác dụng vào vật và làm vật dịch chuyển:
- **Công cơ học** ($A$):
$$A = F \\cdot s$$
Trong đó:
- $F$ là lực tác dụng cùng hướng dịch chuyển (đơn vị: $N$).
- $s$ là quãng đường dịch chuyển (đơn vị: $m$).
- $A$ là công cơ học (đơn vị: Jun, $J$). Đơn vị: $1\\text{ J} = 1\\text{ N} \\cdot 1\\text{ m}$.
- **Công suất** ($\\mathcal{P}$): Là công thực hiện được trong một đơn vị thời gian, đặc trưng cho tốc độ sinh công:
$$\\mathcal{P} = \\frac{A}{t}$$
Đơn vị công suất là Oát ($W$). Đơn vị: $1\\text{ kW} = 1000\\text{ W}$.`,
    summary: 'Công cơ học A = F.s chỉ sinh ra khi có chuyển dời. Công suất P = A/t biểu thị tốc độ làm việc nhanh chậm.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Dạy học sinh phân biệt khái niệm "công" trong ngôn ngữ đời thường (ngồi suy nghĩ, vác nặng đứng yên) với công cơ học chuẩn xác trong vật lý.',
      misconceptions: [
        'Học sinh nghĩ một người lực lưỡng đứng gánh tạ nặng $100\\text{ kg}$ đứng yên suốt 1 tiếng là thực hiện công cơ học khổng lồ (thực tế s = 0 nên A = 0).',
        'Nghĩ máy có công suất lớn là máy làm được ít việc hơn.'
      ],
      guiding_questions: [
        'Một người dùng hết sức đẩy bức tường bê tông nhưng tường không hề nhúc nhích, người đó có sinh công cơ học không?',
        'Hai chiếc cần cẩu cùng nâng khối hàng $1\\text{ tấn}$ lên cao $10\\text{ m}$, chiếc A mất $20\\text{ s}$, chiếc B mất $40\\text{ s}$, chiếc nào có công suất lớn hơn?'
      ],
      home_experiments: [
        {
          title: 'Đo công suất leo cầu thang của chính em',
          materials: ['Cân điện tử đo khối lượng cơ thể', 'Thước đo chiều cao bậc cầu thang', 'Đồng hồ bấm giây'],
          steps: [
            'Cân khối lượng $m$ (kg) để tính trọng lượng $P = 10 \\cdot m$ (N).',
            'Đo tổng chiều cao $h$ (m) của 1 tầng cầu thang nhà em.',
            'Chạy đều lên cầu thang và bấm thời gian $t$ (giây).',
            'Tính công $A = P \\cdot h$ và công suất $\\mathcal{P} = \\frac{A}{t}$.'
          ],
          expected_outcome: 'Học sinh tính được chính xác công suất cơ học của bản thân bằng đơn vị Oát (W).',
          safety_notes: 'Leo cầu thang cẩn thận, bám vào tay vịn tránh vấp ngã.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một cần cẩu nâng một kiện hàng có trọng lượng $F = 5000\\text{ N}$ lên độ cao $s = 6\\text{ m}$ theo phương thẳng đứng. Công cơ học do cần cẩu thực hiện là bao nhiêu Jun (J)?',
        latex_formula: 'A = F \\cdot s',
        correct_answer: '30000',
        numeric_tolerance: 0.02,
        numeric_unit: 'J',
        difficulty: 'medium',
        points: 10,
        hints: [
          { level: 1, hint: 'Áp dụng công thức $A = F \\cdot s$ với $F = 5000\\text{ N}$ và $s = 6\\text{ m}$.' }
        ],
        explanation: 'Công cơ học tính theo công thức: $A = F \\cdot s = 5000 \\cdot 6 = 30000\\text{ J}$.'
      }
    ]
  },
  {
    grade: 8,
    tier: 'middle',
    topicTitle: 'Nhiệt năng, sự truyền nhiệt & Nhiệt dung riêng',
    slug: 'lop-8-nhiet-nang-nhiet-dung-rieng',
    topicDescription: 'Nhiệt năng, các hình thức truyền nhiệt (dẫn nhiệt, đối lưu, bức xạ nhiệt) và công thức Q = m.c.Delta_t.',
    icon: 'Flame',
    lessonTitle: 'Nhiệt lượng và Phương trình cân bằng nhiệt',
    lessonSlug: 'nhiet-luong-can-bang-nhiet',
    contentMarkdown: `# Nhiệt năng và Nhiệt lượng

Mọi phân tử cấu tạo nên vật chất luôn chuyển động hỗn loạn không ngừng:
- **Nhiệt năng**: Là tổng động năng của các phân tử cấu tạo nên vật. Nhiệt độ càng cao thì các phân tử chuyển động càng nhanh và nhiệt năng càng lớn.
- Các hình thức truyền nhiệt:
  - **Dẫn nhiệt**: Chủ yếu xảy ra trong chất rắn (thìa kim loại dẫn nhiệt).
  - **Đối lưu**: Truyền nhiệt bằng các dòng chất lỏng hoặc chất khí (đun nước trong ấm, gió biển).
  - **Bức xạ nhiệt**: Truyền nhiệt bằng các tia nhiệt đi thẳng qua chân không (ánh nắng Mặt Trời sưởi ấm Trái Đất).
- **Nhiệt lượng** ($Q$):
$$Q = m \\cdot c \\cdot \\Delta t$$
Trong đó:
- $m$ là khối lượng vật (đơn vị: $kg$).
- $c$ là nhiệt dung riêng của chất (đơn vị: $J/(kg \\cdot K)$).
- $\\Delta t = t_2 - t_1$ là độ biến thiên nhiệt độ (đơn vị: $^\\circ\\text{C}$ hoặc $K$).`,
    summary: 'Nhiệt năng là động năng phân tử. Nhiệt lượng Q = m.c.Delta_t đo năng lượng truyền trong quá trình nhiệt.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Giúp học sinh phân biệt 3 hình thức truyền nhiệt và hiểu vì sao nước có nhiệt dung riêng lớn giúp điều hòa khí hậu ven biển.',
      misconceptions: [
        'Học sinh nghĩ nhiệt năng và nhiệt độ là một đại lượng giống nhau.',
        'Nghĩ rằng bức xạ nhiệt cần có không khí để truyền đi.'
      ],
      guiding_questions: [
        'Nhiệt từ ngọn lửa Mặt Trời cách xa 150 triệu km truyền qua khoảng không vũ trụ chân không đến Trái Đất bằng hình thức truyền nhiệt nào?',
        'Tại sao khi đun nước trong ấm ta lại đặt ngọn lửa ở dưới đáy ấm chứ không đặt ở trên nắp ấm?'
      ],
      home_experiments: [
        {
          title: 'Khảo sát dòng đối lưu trong nước ấm',
          materials: ['1 cốc thủy tinh chịu nhiệt đựng nước trong', '1 giọt phẩm màu hoặc hạt trà túi lọc', 'Nước nóng'],
          steps: [
            'Nhỏ nhẹ nhàng 1 giọt phẩm màu xuống đáy cốc nước lạnh.',
            'Đặt đáy cốc lên một bề mặt ấm nóng (như đĩa đựng nước nóng).',
            'Quan sát luồng phẩm màu di chuyển.'
          ],
          expected_outcome: 'Dòng nước nóng ở đáy nhẹ hơn nổi lên trên, dòng nước lạnh ở trên chìm xuống tạo thành dòng đối lưu cuốn theo vệt màu rõ rệt.',
          safety_notes: 'Thực hiện cẩn thận với nước nóng.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Nhiệt năng từ Mặt Trời truyền qua khoảng không gian chân không đến Trái Đất chủ yếu bằng hình thức truyền nhiệt nào?',
        options: [
          { id: 'A', text: 'Dẫn nhiệt qua kim loại' },
          { id: 'B', text: 'Đối lưu của không khí' },
          { id: 'C', text: 'Bức xạ nhiệt' },
          { id: 'D', text: 'Chuyển động của dòng nước biển' }
        ],
        correct_answer: 'C',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Hình thức truyền nhiệt duy nhất có thể đi xuyên qua khoảng chân không tuyệt đối.' }
        ],
        explanation: 'Bức xạ nhiệt truyền bằng sóng điện từ nên truyền được qua chân không vũ trụ.'
      }
    ]
  },

  // ==========================================
  // GRADE 9 (Middle - 5 topics)
  // ==========================================
  {
    grade: 9,
    tier: 'middle',
    topicTitle: 'Đoạn mạch nối tiếp và đoạn mạch song song',
    slug: 'lop-9-doan-mach-noi-tiep-song-song',
    topicDescription: 'Công thức cường độ dòng điện, hiệu điện thế và điện trở tương đương của mạch nối tiếp và mạch song song.',
    icon: 'GitMerge',
    lessonTitle: 'Đặc tính của Mạch điện ghép',
    lessonSlug: 'mach-dien-ghep-noi-tiep-song-song',
    contentMarkdown: `# Mạch điện nối tiếp và song song

Khi ghép các điện trở trong mạch điện:
- **Đoạn mạch nối tiếp** ($R_1$ mắc nối tiếp $R_2$):
  - Cường độ dòng điện: $I = I_1 = I_2$
  - Hiệu điện thế: $U = U_1 + U_2$
  - Điện trở tương đương:
$$R_{td} = R_1 + R_2$$
- **Đoạn mạch song song** ($R_1$ mắc song song $R_2$):
  - Hiệu điện thế: $U = U_1 = U_2$
  - Cường độ dòng điện: $I = I_1 + I_2$
  - Điện trở tương đương:
$$\\frac{1}{R_{td}} = \\frac{1}{R_1} + \\frac{1}{R_2} \\implies R_{td} = \\frac{R_1 \\cdot R_2}{R_1 + R_2}$$
Trong gia đình, các thiết bị điện luôn được mắc song song để hoạt động độc lập với hiệu điện thế định mức $220\\text{V}$.`,
    summary: 'Mạch nối tiếp: Rtd = R1 + R2, dòng điện bằng nhau. Mạch song song: 1/Rtd = 1/R1 + 1/R2, hiệu điện thế bằng nhau.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Giúp học sinh làm chủ cách tính điện trở tương đương và giải thích tại sao trong gia đình bóng đèn phòng khách tắt thì đèn phòng ngủ vẫn sáng.',
      misconceptions: [
        'Học sinh thường nghĩ mắc thêm điện trở song song sẽ làm tăng điện trở toàn mạch (thực tế Rtd giảm đi).',
        'Quên nghịch đảo lại khi tính 1/Rtd trong mạch song song.'
      ],
      guiding_questions: [
        'Tại sao bóng đèn dây tóc trên cây thông Noel kiểu cũ khi cháy một bóng thì toàn bộ dãy đèn tắt ngấm?',
        'Các thiết bị điện trong nhà con được mắc nối tiếp hay song song với nhau? Vì sao?'
      ],
      home_experiments: [
        {
          title: 'Khảo sát mạch điện gia đình an toàn trên bản vẽ',
          materials: ['1 sơ đồ hộp cầu dao / aptomat gia đình', 'Bút dạ màu'],
          steps: [
            'Cùng bố mẹ xem bảng điện tổng của nhà.',
            'Xác định các đường dây cấp điện song song ra từng phòng (phòng khách, phòng bếp, phòng ngủ).',
            'Thử tắt aptomat phòng bếp và kiểm tra đèn phòng khách vẫn sáng bình thường.'
          ],
          expected_outcome: 'Học sinh chứng minh được các nhánh mạch trong nhà hoạt động độc lập nhờ cách mắc song song.',
          safety_notes: 'Chỉ quan sát dưới sự điều hành trực tiếp của phụ huynh.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Cho hai điện trở $R_1 = 30\\,\\Omega$ và $R_2 = 20\\,\\Omega$ mắc nối tiếp với nhau vào nguồn điện. Điện trở tương đương $R_{td}$ của đoạn mạch có giá trị bằng bao nhiêu Ôm ($\\Omega$)?',
        latex_formula: 'R_{td} = R_1 + R_2',
        correct_answer: '50',
        numeric_tolerance: 0.02,
        numeric_unit: 'Ω',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Trong đoạn mạch mắc nối tiếp: $R_{td} = R_1 + R_2$.' }
        ],
        explanation: 'Áp dụng công thức mắc nối tiếp: $R_{td} = R_1 + R_2 = 30 + 20 = 50\\,\\Omega$.'
      }
    ]
  },
  {
    grade: 9,
    tier: 'middle',
    topicTitle: 'Công suất điện và điện năng tiêu thụ',
    slug: 'lop-9-cong-suat-dien-dien-nang',
    topicDescription: 'Công thức công suất P = U.I, định luật Joule - Lenz Q = I^2.R.t và cách tính số đếm công tơ điện (kWh).',
    icon: 'Power',
    lessonTitle: 'Điện năng và Định luật Joule - Lenz',
    lessonSlug: 'dien-nang-dinh-luat-joule-lenz',
    contentMarkdown: `# Công suất điện và Điện năng tiêu thụ

Điện năng cung cấp năng lượng cho mọi hoạt động máy móc:
- **Công suất điện** ($\\mathcal{P}$):
$$\\mathcal{P} = U \\cdot I = I^2 \\cdot R = \\frac{U^2}{R}$$
- **Điện năng tiêu thụ** ($A$):
$$A = \\mathcal{P} \\cdot t = U \\cdot I \\cdot t$$
- Trong đời sống, điện năng tiêu thụ đo bằng kilôoát giờ ($kWh$), thường gọi dân dã là **"số điện"**:
$$1\\text{ kWh} = 1000\\text{ W} \\cdot 3600\\text{ s} = 3.6 \\times 10^6\\text{ J} = 3\\,600\\,000\\text{ J}$$
- **Định luật Joule - Lenz**: Nhiệt lượng tỏa ra trên dây dẫn tỷ lệ thuận với bình phương cường độ dòng điện, với điện trở và thời gian:
$$Q = I^2 \\cdot R \\cdot t$$`,
    summary: 'Công suất P = U.I. Điện năng A = P.t đo bằng kWh (số điện). Nhiệt lượng tỏa ra Q = I^2.R.t theo định luật Joule - Lenz.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Dạy học sinh cách đọc công suất trên nhãn mác đồ gia dụng (nồi cơm, điều hòa) và tự tính tiền điện hàng tháng.',
      misconceptions: [
        'Học sinh nghĩ kW là đơn vị của năng lượng (kW là công suất, kWh mới là năng lượng).',
        'Nghĩ rằng dùng bóng đèn sợi đốt 100W tiết kiệm hơn bóng LED 15W.'
      ],
      guiding_questions: [
        'Một chiếc điều hòa có công suất $1000\\text{ W}$ chạy liên tục trong $8\\text{ giờ}$ mỗi đêm sẽ tiêu thụ bao nhiêu số điện (kWh)?',
        'Tại sao dây mayso của bếp điện nóng đỏ rực tỏa nhiệt mạnh còn dây đồng nối vào ổ cắm thì hầu như không nóng?'
      ],
      home_experiments: [
        {
          title: 'Khảo sát công suất các đồ điện gia đình',
          materials: ['Sổ tay ghi chép', 'Quan sát nhãn thông số kỹ thuật trên ấm siêu tốc, tủ lạnh, tivi, bóng đèn'],
          steps: [
            'Đọc giá trị công suất định mức (W hoặc kW) ghi trên vỏ các thiết bị điện.',
            'Lập bảng tính điện năng tiêu thụ ước tính trong 1 ngày cho từng thiết bị.',
            'So sánh xem thiết bị nào tiêu tốn nhiều điện năng nhất trong gia đình.'
          ],
          expected_outcome: 'Học sinh nhận thấy các thiết bị sinh nhiệt (bình nóng lạnh, ấm siêu tốc, bàn là) có công suất lớn nhất (1500W - 2500W).',
          safety_notes: 'Chỉ quan sát bằng mắt các tem nhãn phía ngoài thiết bị.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một bóng đèn sợi đốt ghi $220\\text{V} - 100\\text{W}$ được sử dụng ở hiệu điện thế $220\\text{V}$ trong thời gian $5\\text{ giờ}$. Điện năng tiêu thụ của bóng đèn trong thời gian đó là bao nhiêu kilôoát giờ (kWh)?',
        latex_formula: 'A = \\mathcal{P} \\cdot t',
        correct_answer: '0.5',
        numeric_tolerance: 0.02,
        numeric_unit: 'kWh',
        difficulty: 'medium',
        points: 10,
        hints: [
          { level: 1, hint: 'Đổi công suất $\\mathcal{P} = 100\\text{ W} = 0.1\\text{ kW}$, sau đó lấy $A = \\mathcal{P} \\cdot t$ với $t = 5\\text{ h}$.' }
        ],
        explanation: 'Điện năng tiêu thụ tính bằng: $A = \\mathcal{P} \\cdot t = 0.1\\text{ kW} \\cdot 5\\text{ h} = 0.5\\text{ kWh}$.'
      }
    ]
  },
  {
    grade: 9,
    tier: 'middle',
    topicTitle: 'Từ trường, từ phổ và nam châm điện',
    slug: 'lop-9-tu-truong-nam-cham-dien',
    topicDescription: 'Không gian quanh nam châm có từ trường, quy tắc bàn tay phải xác định chiều đường sức từ của ống dây có dòng điện.',
    icon: 'Magnet',
    lessonTitle: 'Từ trường và Nam châm điện',
    lessonSlug: 'tu-truong-nam-cham-dien',
    contentMarkdown: `# Từ trường và Dòng điện

Không gian xung quanh nam châm hoặc xung quanh dòng điện tồn tại **từ trường**:
- Từ trường tác dụng **lực từ** lên kim nam châm đặt trong nó.
- **Đường sức từ**: Có chiều quy ước đi ra từ cực Bắc ($N$) và đi vào cực Nam ($S$) của nam châm: **"Vào Nam Ra Bắc"**.
- **Quy tắc bàn tay phải**: Nắm bàn tay phải sao cho 4 ngón tay khum theo chiều dòng điện chạy qua các vòng dây của ống dây, thì ngón tay cái choãi ra chỉ chiều của đường sức từ trong lòng ống dây.
- **Nam châm điện**: Gồm ống dây quấn quanh một lõi sắt non. Khi có dòng điện chạy qua, lõi sắt trở thành nam châm cực mạnh; khi ngắt điện, từ tính biến mất ngay lập tức (ứng dụng trong cần cẩu bốc dỡ sắt phế liệu).`,
    summary: 'Từ trường tác dụng lực từ. Đường sức từ vào Nam ra Bắc. Nam châm điện có từ tính mạnh và điều khiển được bằng dòng điện.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Giúp học sinh hiểu mối liên hệ mật thiết giữa Điện và Từ, cơ sở của công nghệ rơ le tự động và chuông điện.',
      misconceptions: [
        'Học sinh nghĩ nam châm điện dùng lõi thép sẽ tốt hơn lõi sắt non (thực tế lõi thép giữ từ tính lâu thành nam châm vĩnh cửu, không ngắt được lực từ khi cần).',
        'Nghĩ rằng từ trường có thể nhìn thấy trực tiếp bằng mắt thường mà không cần mạt sắt.'
      ],
      guiding_questions: [
        'Tại sao chiếc cần cẩu nam châm điện ở bến cảng có thể hút được một khối sắt nặng 5 tấn rồi lại thả rơi nó xuống thùng xe tải nhẹ nhàng?',
        'Làm thế nào để tăng lực từ của một chiếc nam châm điện tự chế?'
      ],
      home_experiments: [
        {
          title: 'Tự chế nam châm điện mini từ chiếc đinh sắt',
          materials: ['1 chiếc đinh sắt dài 6 cm', '1 mét dây đồng bọc men', '1 viên pin 1.5V', 'Một ít ghim giấy sắt'],
          steps: [
            'Quấn dây đồng thật chặt quanh thân chiếc đinh sắt khoảng 50 vòng theo một chiều.',
            'Cạo sạch lớp men cách điện ở hai đầu dây.',
            'Nối 2 đầu dây vào 2 cực của pin và đưa đầu đinh lại gần ghim giấy sắt để quan sát đinh hút ghim.',
            'Ngắt một đầu dây khỏi pin và quan sát ghim giấy rơi xuống.'
          ],
          expected_outcome: 'Khi có dòng điện, chiếc đinh hút chặt ghim giấy; ngắt dòng điện ghim rơi ra ngay lập tức.',
          safety_notes: 'Không nối pin liên tục quá lâu vì pin sẽ bị nóng.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Chiều của đường sức từ ở bên ngoài thanh nam châm được quy ước theo quy tắc nào sau đây?',
        options: [
          { id: 'A', text: 'Đi ra từ cực Nam và đi vào cực Bắc' },
          { id: 'B', text: 'Đi ra từ cực Bắc và đi vào cực Nam ("Vào Nam Ra Bắc")' },
          { id: 'C', text: 'Luôn hướng thẳng đứng lên trời' },
          { id: 'D', text: 'Chạy vòng tròn khép kín không có cực' }
        ],
        correct_answer: 'B',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Quy tắc ngắn gọn thường nhớ: "Vào Nam Ra Bắc".' }
        ],
        explanation: 'Quy ước chiều đường sức từ bên ngoài nam châm: đi ra từ cực Bắc (N) và đi vào cực Nam (S).'
      }
    ]
  },
  {
    grade: 9,
    tier: 'middle',
    topicTitle: 'Cảm ứng điện từ & Dòng điện xoay chiều',
    slug: 'lop-9-cam-ung-dien-tu-xoay-chieu',
    topicDescription: 'Hiện tượng cảm ứng điện từ (Faraday), máy phát điện xoay chiều, máy biến thế và truyền tải điện năng đi xa.',
    icon: 'Activity',
    lessonTitle: 'Sáng tạo ra Dòng điện',
    lessonSlug: 'sang-tao-ra-dong-dien',
    contentMarkdown: `# Hiện tượng cảm ứng điện từ

Năm 1831, Michael Faraday khám phá ra hiện tượng làm thay đổi lịch sử nhân loại:
- **Hiện tượng cảm ứng điện từ**: Khi số đường sức từ xuyên qua tiết diện của cuộn dây dẫn kín biến thiên (tăng lên hoặc giảm đi), trong cuộn dây xuất hiện dòng điện cảm ứng.
- **Dòng điện xoay chiều** ($AC$): Là dòng điện có chiều luân phiên đổi ngược liên tục theo thời gian (dòng điện gia đình có tần số $50\\text{ Hz}$, đổi chiều 100 lần mỗi giây).
- **Máy biến thế**: Thiết bị biến đổi hiệu điện thế xoay chiều:
$$\\frac{U_1}{U_2} = \\frac{N_1}{N_2}$$
- Trong truyền tải điện đi xa, người ta dùng máy tăng thế để tăng $U$ lên hàng trăm nghìn Vôn nhằm giảm hao phí do nhiệt lượng ($P_{hp} \\sim \\frac{1}{U^2}$).`,
    summary: 'Cảm ứng điện từ biến cơ năng thành điện năng. Máy biến áp tuân theo tỷ số U1/U2 = N1/N2.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Giúp học sinh hiểu nguồn gốc dòng điện phát ra từ các nhà máy thủy điện/nhiệt điện và vì sao cần đường dây cao thế 500kV Bắc - Nam.',
      misconceptions: [
        'Học sinh nghĩ nam châm cứ đứng yên trong cuộn dây là có dòng điện cảm ứng (phải có chuyển động làm biến thiên từ thông).',
        'Nghĩ máy biến thế có thể làm tăng cả hiệu điện thế lẫn cường độ dòng điện cùng lúc.'
      ],
      guiding_questions: [
        'Tại sao trên đường dây truyền tải điện Bắc - Nam người ta phải nâng hiệu điện thế lên tới $500\\,000\\text{ V}$ thay vì để $220\\text{ V}$ truyền đi?',
        'Chiếc máy phát điện mini gắn ở bánh xe đạp (đinamô) phát sáng bóng đèn nhờ nguyên lý vật lý nào?'
      ],
      home_experiments: [
        {
          title: 'Khảo sát cấu tạo chiếc đinamô xe đạp hoặc quạt phát điện mini',
          materials: ['1 chiếc mô-tơ đồ chơi DC nhỏ', '1 bóng đèn LED nhỏ gắn vào 2 đầu dây mô-tơ'],
          steps: [
            'Dùng tay quay thật nhanh trục của mô-tơ đồ chơi.',
            'Quan sát bóng đèn LED nối ở 2 cực.'
          ],
          expected_outcome: 'Khi trục mô-tơ quay, cuộn dây quay trong từ trường nam châm sinh ra dòng điện làm bóng LED sáng nhấp nháy.',
          safety_notes: 'Quay trục bằng tay nhẹ nhàng không làm gãy chân đèn LED.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một máy biến thế có số vòng dây cuộn sơ cấp $N_1 = 4400\\text{ vòng}$ và cuộn thứ cấp $N_2 = 220\\text{ vòng}$. Khi đặt vào hai đầu cuộn sơ cấp hiệu điện thế $U_1 = 220\\text{ V}$, hiệu điện thế $U_2$ ở hai đầu cuộn thứ cấp là bao nhiêu Vôn (V)?',
        latex_formula: '\\frac{U_1}{U_2} = \\frac{N_1}{N_2}',
        correct_answer: '11',
        numeric_tolerance: 0.02,
        numeric_unit: 'V',
        difficulty: 'medium',
        points: 10,
        hints: [
          { level: 1, hint: 'Sử dụng hệ thức máy biến thế: $U_2 = U_1 \\cdot \\frac{N_2}{N_1}$.' }
        ],
        explanation: 'Áp dụng công thức máy biến thế: $U_2 = U_1 \\cdot \\frac{N_2}{N_1} = 220 \\cdot \\frac{220}{4400} = 11\\text{ V}$.'
      }
    ]
  },
  {
    grade: 9,
    tier: 'middle',
    topicTitle: 'Khúc xạ ánh sáng và thấu kính hội tụ',
    slug: 'lop-9-khuc-xa-thau-kinh-hoi-tu',
    topicDescription: 'Hiện tượng khúc xạ ánh sáng, tiêu cự, quang tâm, dựng ảnh của vật qua thấu kính hội tụ (ảnh thật, ảnh ảo).',
    icon: 'Glasses',
    lessonTitle: 'Khúc xạ ánh sáng và Thấu kính',
    lessonSlug: 'khuc-xa-thau-kinh',
    contentMarkdown: `# Khúc xạ và Thấu kính hội tụ

Hiện tượng tia sáng bị gãy khúc khi truyền xiên góc qua mặt phân cách giữa hai môi trường trong suốt gọi là **hiện tượng khúc xạ ánh sáng**:
- Khi truyền từ không khí vào nước: góc khúc xạ $r$ nhỏ hơn góc tới $i$ ($r < i$).
- **Thấu kính hội tụ**: Có phần rìa mỏng hơn phần giữa.
- Các tia sáng đặc biệt qua thấu kính hội tụ:
  1. Tia tới đi qua **quang tâm $O$** thì truyền thẳng.
  2. Tia tới song song với **trục chính** thì tia ló đi qua **tiêu điểm $F'$**.
  3. Tia tới đi qua **tiêu điểm $F$** thì tia ló song song với trục chính.
- Công thức thấu kính:
$$\\frac{1}{f} = \\frac{1}{d} + \\frac{1}{d'}$$
Ứng dụng: Kính lúp, ống nhòm, máy ảnh và khắc phục tật viễn thị, lão thị của mắt.`,
    summary: 'Khúc xạ là sự gãy khúc của tia sáng. Thấu kính hội tụ hội tụ chùm sáng, tuân theo hệ thức 1/f = 1/d + 1/d\'.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Giúp học sinh vẽ đường truyền 3 tia sáng đặc biệt qua thấu kính và hiểu nguyên lý hoạt động của chiếc kính lúp.',
      misconceptions: [
        'Học sinh nhìn thấy chiếc đũa cắm trong cốc nước bị gãy khúc và nghĩ chiếc đũa bị bẻ gãy thật sự.',
        'Nhầm lẫn giữa ảnh thật (ngược chiều vật) và ảnh ảo (cùng chiều vật) qua thấu kính hội tụ.'
      ],
      guiding_questions: [
        'Tại sao khi con nhìn xuống đáy bể bơi nước trong veo, đáy bể luôn có cảm giác nông hơn so với độ sâu thực tế?',
        'Để dùng kính lúp quan sát một con kiến phóng to khổng lồ, con phải đặt con kiến trong khoảng tiêu cự hay ngoài khoảng tiêu cự của kính?'
      ],
      home_experiments: [
        {
          title: 'Chiếc đũa bị bẻ gãy trong cốc nước',
          materials: ['1 cốc thủy tinh trong suốt', 'Nước sạch', '1 chiếc đũa ăn cơm'],
          steps: [
            'Đổ nước vào 2/3 cốc thủy tinh.',
            'Cắm chiếc đũa nghiêng vào cốc nước và quan sát từ mặt bên của cốc.'
          ],
          expected_outcome: 'Chiếc đũa trông như bị gãy gập ngay tại mặt phân cách giữa không khí và nước do hiện tượng khúc xạ ánh sáng.',
          safety_notes: 'Thực hiện nhẹ nhàng không làm đổ cốc nước.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Đặc điểm nào sau đây là ĐÚNG đối với thấu kính hội tụ bằng thủy tinh trong không khí?',
        options: [
          { id: 'A', text: 'Phần rìa dày hơn phần giữa' },
          { id: 'B', text: 'Phần giữa dày hơn phần rìa' },
          { id: 'C', text: 'Làm phân kỳ chùm tia sáng tới song song' },
          { id: 'D', text: 'Hoàn toàn không cho ánh sáng truyền qua' }
        ],
        correct_answer: 'B',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Thấu kính hội tụ có hình dạng phồng ở giữa và mỏng dần về mép ngoài.' }
        ],
        explanation: 'Thấu kính hội tụ có phần rìa mỏng hơn phần giữa, làm hội tụ chùm sáng tới song song.'
      }
    ]
  }
];

console.log(`Generated ${topicsPart3.length} topics for grades 8 & 9.`);

function extractFormulas(text) {
  if (!text) return [];
  const results = [];
  const blockRegex = /\$\$([\s\S]+?)\$\$/g;
  let match;
  while ((match = blockRegex.exec(text)) !== null) {
    results.push({ formula: match[1].trim(), displayMode: true });
  }
  const textWithoutBlocks = text.replace(blockRegex, ' ');
  const inlineRegex = /(?<!\$)\$(?!\$)([^\$\n]+?)(?<!\$)\$(?!\$)/g;
  while ((match = inlineRegex.exec(textWithoutBlocks)) !== null) {
    results.push({ formula: match[1].trim(), displayMode: false });
  }
  return results;
}

// Verify KaTeX
for (const t of topicsPart3) {
  const texts = [
    t.contentMarkdown,
    t.summary,
    t.parentGuide.summary,
    ...t.parentGuide.misconceptions,
    ...t.parentGuide.guiding_questions,
  ];
  for (const exp of t.parentGuide.home_experiments) {
    texts.push(exp.title, exp.expected_outcome, ...(exp.materials || []), ...(exp.steps || []));
  }
  for (const q of t.questions) {
    texts.push(q.prompt, q.explanation, ...(q.hints || []).map(h => h.hint || h.text || ''));
    if (q.options) texts.push(...q.options.map(o => o.text));
  }

  for (const str of texts) {
    for (const f of extractFormulas(str)) {
      try {
        katex.renderToString(f.formula, { throwOnError: true, displayMode: f.displayMode });
      } catch (e) {
        console.error(`KaTeX error in topic ${t.slug}: "${f.formula}"`, e.message);
        process.exit(1);
      }
    }
  }
}
console.log('Verified KaTeX in grades 8 & 9 successfully.');

fs.writeFileSync(path.resolve(__dirname, 'temp_grades_8_9.json'), JSON.stringify(topicsPart3, null, 2), 'utf-8');
