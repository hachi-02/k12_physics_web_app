// D:\k12_physics_web_app\scripts\append_grades_10_to_12.js
const fs = require('fs');
const path = require('path');
const katex = require('katex');

const topicsPart4 = [
  // ==========================================
  // GRADE 10 (High - 5 topics)
  // ==========================================
  {
    grade: 10,
    tier: 'high',
    topicTitle: 'Mô tả chuyển động: Độ dịch chuyển & Vận tốc',
    slug: 'lop-10-do-dich-chuyen-van-toc',
    topicDescription: 'Phân biệt quãng đường s và vectơ độ dịch chuyển d, vận tốc trung bình và tốc độ trung bình.',
    icon: 'TrendingUp',
    lessonTitle: 'Độ dịch chuyển và Vận tốc véctơ',
    lessonSlug: 'do-dich-chuyen-va-van-toc',
    contentMarkdown: `# Chuyển động học chất điểm

Trong vật lý cơ học chất điểm:
- **Độ dịch chuyển** ($\\vec{d}$): Là một đại lượng véctơ nối vị trí đầu và vị trí cuối của chất điểm. Độ lớn của $\\vec{d}$ có thể bằng, nhỏ hơn quãng đường $s$ hoặc bằng 0 nếu vật quay về điểm xuất phát.
- **Vận tốc** ($\\vec{v}$): Là đại lượng véctơ xác định hướng và tốc độ thay đổi vị trí của vật:
$$\\vec{v} = \\frac{\\vec{d}}{\\Delta t}$$
- **Tốc độ trung bình**: $v_{tb} = \\frac{s}{\\Delta t}$ (luôn dương).
- Khi vật chuyển động thẳng không đổi chiều, độ dịch chuyển $d$ bằng quãng đường $s$, khi đó vận tốc có độ lớn bằng tốc độ.`,
    summary: 'Độ dịch chuyển là véctơ nối điểm đầu và cuối. Vận tốc v = d/Delta_t biểu thị hướng và độ nhanh chuyển vị.',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Giúp học sinh phân biệt rạch ròi giữa quãng đường vô hướng và độ dịch chuyển có hướng vectơ trong chương trình GDPT 2018.',
      misconceptions: [
        'Học sinh thường đồng nhất độ dịch chuyển với quãng đường đi được.',
        'Nghĩ rằng vận tốc và tốc độ là hai từ đồng nghĩa (tốc độ là độ lớn của vận tốc tức thời).'
      ],
      guiding_questions: [
        'Một vận động viên bơi một vòng bể bơi dài 50 m từ bờ này sang bờ kia rồi bơi quay lại vạch xuất phát, độ dịch chuyển tổng cộng là bao nhiêu?',
        'Khi nào thì độ lớn của độ dịch chuyển bằng đúng quãng đường đi được?'
      ],
      home_experiments: [
        {
          title: 'Khảo sát quỹ đạo và độ dịch chuyển đi bộ trong phòng',
          materials: ['Thước dây đo', 'Phấn hoặc băng dính đánh dấu sàn'],
          steps: [
            'Bước đi 4 mét theo hướng Bắc, sau đó rẽ vuông góc bước tiếp 3 mét theo hướng Đông.',
            'Đo quãng đường đi được: $s = 4 + 3 = 7\\text{ m}$.',
            'Dùng thước đo trực tiếp khoảng cách từ điểm xuất phát đến điểm kết thúc theo đường chim bay.'
          ],
          expected_outcome: 'Độ dịch chuyển đo được bằng 5 mét (theo định lý Pytago $\\sqrt{4^2 + 3^2} = 5$), nhỏ hơn quãng đường 7 mét.',
          safety_notes: 'Thực hiện trong phòng trống tránh va vào bàn ghế.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một chất điểm chuyển động thẳng từ vị trí $x_1 = 2\\text{ m}$ đến vị trí $x_2 = 14\\text{ m}$ trong thời gian $\\Delta t = 3\\text{ s}$. Vận tốc của chất điểm là bao nhiêu m/s?',
        latex_formula: 'v = \\frac{x_2 - x_1}{\\Delta t}',
        correct_answer: '4',
        numeric_tolerance: 0.02,
        numeric_unit: 'm/s',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Độ dịch chuyển $d = x_2 - x_1 = 14 - 2 = 12\\text{ m}$. Sau đó lấy $v = \\frac{d}{\\Delta t}$.' }
        ],
        explanation: 'Vận tốc tính bằng: $v = \\frac{x_2 - x_1}{\\Delta t} = \\frac{14 - 2}{3} = 4\\text{ m/s}$.'
      }
    ]
  },
  {
    grade: 10,
    tier: 'high',
    topicTitle: 'Chuyển động biến đổi đều & Rơi tự do',
    slug: 'lop-10-chuyen-dong-bien-doi-deu-roi-tu-do',
    topicDescription: 'Gia tốc a = (v - v0)/t, các phương trình chuyển động thẳng biến đổi đều và gia tốc trọng trường g.',
    icon: 'ArrowDownCircle',
    lessonTitle: 'Phương trình chuyển động biến đổi đều',
    lessonSlug: 'phuong-trinh-chuyen-dong-bien-doi-deu',
    contentMarkdown: `# Chuyển động thẳng biến đổi đều

Chuyển động có quỹ đạo thẳng và vận tốc biến đổi đều theo thời gian:
- **Gia tốc** ($a$):
$$a = \\frac{v - v_0}{t}$$
Đơn vị gia tốc: $m/s^2$.
- Hệ phương trình động học:
$$v = v_0 + a \\cdot t$$
$$d = v_0 \\cdot t + \\frac{1}{2} a \\cdot t^2$$
$$v^2 - v_0^2 = 2 \\cdot a \\cdot d$$
- **Sự rơi tự do**: Là chuyển động rơi chỉ dưới tác dụng của trọng lực ($v_0 = 0, a = g \\approx 9.8\\text{ m/s}^2$). Mọi vật ở cùng một nơi đều rơi tự do với cùng gia tốc $g$ không phụ thuộc khối lượng.`,
    summary: 'Chuyển động biến đổi đều có gia tốc a không đổi. Rơi tự do là chuyển động nhanh dần đều với gia tốc g.',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Giúp học sinh áp dụng thuần thục hệ 3 phương trình chuyển động thẳng biến đổi đều và hiểu bản chất thí nghiệm tháp nghiêng Pisa của Galileo.',
      misconceptions: [
        'Học sinh thường nghĩ vật nặng rơi tự do nhanh hơn vật nhẹ (trong chân không hòn đá và chiếc lông chim rơi chạm đất cùng lúc).',
        'Quên hệ số 1/2 trong công thức tính độ dịch chuyển $d = v_0 t + \\frac{1}{2}at^2$.'
      ],
      guiding_questions: [
        'Nếu thả một tờ giấy phẳng và một hòn đá trong một ống thủy tinh đã hút chân không hoàn toàn, vật nào sẽ chạm đáy trước?',
        'Khi một chiếc xe máy hãm phanh chuyển động chậm dần đều, véctơ gia tốc cùng hướng hay ngược hướng với véctơ vận tốc?'
      ],
      home_experiments: [
        {
          title: 'Đo thời gian phản xạ bằng chiếc thước rơi tự do',
          materials: ['1 chiếc thước kẻ nhựa dài 30 cm'],
          steps: [
            'Bố mẹ cầm đầu trên của thước giơ thẳng đứng.',
            'Con xòe ngón cái và ngón trỏ chờ sẵn ở vạch số 0 (không chạm vào thước).',
            'Bố mẹ bất ngờ buông tay cho thước rơi tự do, con chộp thật nhanh giữ thước lại.',
            'Ghi lại vạch centimet $h$ (m) nơi ngón tay bắt được thước, tính thời gian phản xạ $t = \\sqrt{\\frac{2h}{g}}$.'
          ],
          expected_outcome: 'Tính được thời gian phản xạ thần kinh của học sinh (thường khoảng 0.15 - 0.20 giây).',
          safety_notes: 'Thao tác nhẹ nhàng không làm rơi gãy thước.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một ô tô đang chuyển động với vận tốc ban đầu $v_0 = 10\\text{ m/s}$ thì tăng ga chuyển động nhanh dần đều với gia tốc $a = 2\\text{ m/s}^2$. Sau thời gian $t = 5\\text{ s}$, vận tốc $v$ của ô tô đạt bao nhiêu m/s?',
        latex_formula: 'v = v_0 + a \\cdot t',
        correct_answer: '20',
        numeric_tolerance: 0.02,
        numeric_unit: 'm/s',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Áp dụng công thức $v = v_0 + a \\cdot t$ với $v_0 = 10$, $a = 2$, $t = 5$.' }
        ],
        explanation: 'Vận tốc đạt được: $v = 10 + 2 \\cdot 5 = 20\\text{ m/s}$.'
      }
    ]
  },
  {
    grade: 10,
    tier: 'high',
    topicTitle: 'Các lực cơ học: Hấp dẫn, Đàn hồi & Ma sát',
    slug: 'lop-10-cac-luc-co-hoc-tu-nhien',
    topicDescription: 'Định luật vạn vật hấp dẫn của Newton, định luật Hooke lò xo F = k.|Delta_l| và hệ số ma sát trượt mu.',
    icon: 'Anchor',
    lessonTitle: 'Bản chất các lực cơ học trong tự nhiên',
    lessonSlug: 'ban-chat-luc-co-hoc',
    contentMarkdown: `# Các lực cơ học cơ bản

Trong tự nhiên có các lực cơ học chi phối chuyển động:
- **Định luật vạn vật hấp dẫn**: Hai chất điểm hút nhau bằng lực tỷ lệ thuận với tích khối lượng và tỷ lệ nghịch với bình phương khoảng cách:
$$F_{hd} = G \\cdot \\frac{m_1 \\cdot m_2}{r^2}$$
Hằng số hấp dẫn $G \\approx 6.67 \\times 10^{-11}\\text{ N} \\cdot \\text{m}^2/\\text{kg}^2$.
- **Lực đàn hồi (Định luật Hooke)**: Trong giới hạn đàn hồi, lực đàn hồi của lò xo tỷ lệ thuận với độ biến dạng:
$$F_{dh} = k \\cdot |\\Delta l|$$
Với $k$ là độ cứng lò xo ($N/m$), $\\Delta l = l - l_0$ là độ dãn hoặc nén.
- **Lực ma sát trượt**: $F_{mst} = \\mu \\cdot N$ (với $\\mu$ là hệ số ma sát trượt, $N$ là áp lực vuông góc).`,
    summary: 'Lực hấp dẫn gắn liền với khối lượng. Lực đàn hồi F = k.|Delta_l| tỉ lệ với độ biến dạng. Ma sát trượt F = mu.N.',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Giúp học sinh vẽ và phân tích giản đồ lực (Free Body Diagram) tác dụng lên vật thể trong trạng thái cân bằng hoặc chuyển động có gia tốc.',
      misconceptions: [
        'Học sinh thường nghĩ lò xo càng dài thì độ cứng k càng lớn (thực tế cắt đôi lò xo thì độ cứng tăng gấp đôi).',
        'Nghĩ rằng hệ số ma sát trượt có đơn vị là Niutơn (hệ số ma sát là số không có thứ nguyên).'
      ],
      guiding_questions: [
        'Nếu kéo một lò xo có độ cứng $k = 100\\text{ N/m}$ dãn ra một đoạn $2\\text{ cm}$, lực đàn hồi sinh ra có độ lớn bằng bao nhiêu Niutơn?',
        'Tại sao lực hấp dẫn giữa hai học sinh ngồi cạnh nhau trong lớp lại không làm cho hai bạn bị hút dính vào nhau?'
      ],
      home_experiments: [
        {
          title: 'Khảo sát độ dãn của dây chun theo định luật Hooke',
          materials: ['1 sợi dây cao su dẻo', '1 chiếc móc treo nhỏ', 'Thước đo milimét', 'Các đồng xu có khối lượng bằng nhau'],
          steps: [
            'Treo dây cao su lên giá, đo chiều dài ban đầu $l_0$.',
            'Treo 1 đồng xu, đo độ dãn $\\Delta l_1$.',
            'Treo 2 đồng xu, đo độ dãn $\\Delta l_2$.',
            'So sánh tỷ số giữa trọng lượng tăng thêm và độ dãn tương ứng.'
          ],
          expected_outcome: 'Độ dãn tỷ lệ thuận với số lượng đồng xu treo vào, nghiệm đúng định luật Hooke trong giới hạn đàn hồi.',
          safety_notes: 'Không treo vật quá nặng làm đứt dây cao su.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một lò xo có độ cứng $k = 200\\text{ N/m}$. Khi treo một vật nặng vào, lò xo dãn ra một đoạn $\\Delta l = 0.03\\text{ m}$. Lực đàn hồi của lò xo lúc này có độ lớn bằng bao nhiêu Niutơn (N)?',
        latex_formula: 'F_{dh} = k \\cdot \\Delta l',
        correct_answer: '6',
        numeric_tolerance: 0.02,
        numeric_unit: 'N',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Áp dụng định luật Hooke: $F_{dh} = k \\cdot \\Delta l$ với $k = 200$ và $\\Delta l = 0.03$.' }
        ],
        explanation: 'Độ lớn lực đàn hồi: $F_{dh} = k \\cdot \\Delta l = 200 \\cdot 0.03 = 6\\text{ N}$.'
      }
    ]
  },
  {
    grade: 10,
    tier: 'high',
    topicTitle: 'Năng lượng, công và bảo toàn cơ năng',
    slug: 'lop-10-bao-toan-co-nang',
    topicDescription: 'Công cơ học A = F.s.cos(alpha), động năng Wd = 1/2.m.v^2, thế năng trọng trường Wt = mgh và bảo toàn cơ năng.',
    icon: 'BatteryCharging',
    lessonTitle: 'Định luật bảo toàn cơ năng',
    lessonSlug: 'dinh-luat-bao-toan-co-nang',
    contentMarkdown: `# Cơ năng và Định luật bảo toàn

Cơ năng là tổng của động năng và thế năng của vật:
- **Công của lực không đổi**:
$$A = F \\cdot s \\cdot \\cos\\alpha$$
Với $\\alpha$ là góc hợp bởi véctơ lực $\\vec{F}$ và véctơ độ dịch chuyển $\\vec{s}$.
- **Động năng**:
$$W_d = \\frac{1}{2} m \\cdot v^2$$
- **Thế năng trọng trường**:
$$W_t = m \\cdot g \\cdot h$$
- **Định luật bảo toàn cơ năng**: Khi một vật chỉ chịu tác dụng của trọng lực (hoặc lực đàn hồi), cơ năng của vật là một đại lượng bảo toàn:
$$W = W_d + W_t = \\frac{1}{2} m \\cdot v^2 + m \\cdot g \\cdot h = \\text{hằng số}$$
Ứng dụng: Tàu lượn siêu tốc lao dốc, con lắc đơn, nhảy cầu bungee.`,
    summary: 'Cơ năng W = Wd + Wt bảo toàn khi vật chỉ chịu lực thế. Thế năng chuyển hóa hoàn toàn thành động năng và ngược lại.',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Dạy học sinh phương pháp giải bài toán cơ học bằng định luật bảo toàn năng lượng thay vì dùng định luật Newton phức tạp.',
      misconceptions: [
        'Học sinh quên rằng thế năng phụ thuộc vào việc chọn mốc tính thế năng ($h = 0$).',
        'Nghĩ rằng khi có ma sát cơ năng vẫn được bảo toàn (khi có ma sát, một phần cơ năng biến thành nhiệt năng).'
      ],
      guiding_questions: [
        'Khi một vận động viên trượt ván lao từ đỉnh đồi cao xuống thung lũng rồi vọt lên đồi đối diện, vị trí nào vận tốc lớn nhất?',
        'Tại sao trên đường ray tàu lượn siêu tốc, đỉnh dốc đầu tiên luôn phải được thiết kế cao nhất so với tất cả các đỉnh dốc phía sau?'
      ],
      home_experiments: [
        {
          title: 'Khảo sát bảo toàn cơ năng với viên bi lăn trên máng dốc',
          materials: ['1 đoạn ống nhựa chữ U hoặc máng trượt uốn cong', '1 viên bi sắt'],
          steps: [
            'Thả viên bi từ độ cao $h$ ở nhánh bên trái của máng (không vận tốc đầu).',
            'Quan sát độ cao cực đại $h\'$ mà viên bi leo lên được ở nhánh bên phải.'
          ],
          expected_outcome: 'Viên bi leo lên độ cao gần bằng $h$ ban đầu, minh họa sự bảo toàn cơ năng (thế năng ban đầu chuyển thành động năng rồi lại chuyển thành thế năng).',
          safety_notes: 'Giữ máng trượt vững vàng trên mặt bàn.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một vật có khối lượng $m = 2\\text{ kg}$ rơi tự do từ độ cao $h = 5\\text{ m}$ xuống mặt đất (lấy $g = 10\\text{ m/s}^2$, bỏ qua sức cản không khí, chọn gốc thế năng tại mặt đất). Cơ năng của vật là bao nhiêu Jun (J)?',
        latex_formula: 'W = m \\cdot g \\cdot h',
        correct_answer: '100',
        numeric_tolerance: 0.02,
        numeric_unit: 'J',
        difficulty: 'medium',
        points: 10,
        hints: [
          { level: 1, hint: 'Tại vị trí ban đầu $v = 0$ nên cơ năng $W = W_t = m \\cdot g \\cdot h$.' }
        ],
        explanation: 'Cơ năng của vật: $W = m \\cdot g \\cdot h = 2 \\cdot 10 \\cdot 5 = 100\\text{ J}$.'
      }
    ]
  },
  {
    grade: 10,
    tier: 'high',
    topicTitle: 'Động lượng & Định luật bảo toàn động lượng',
    slug: 'lop-10-dong-luong-va-cham',
    topicDescription: 'Véctơ động lượng p = m.v, hệ kín, bảo toàn động lượng trong va chạm và chuyển động phản lực của tên lửa.',
    icon: 'Crosshair',
    lessonTitle: 'Động lượng và Chuyển động phản lực',
    lessonSlug: 'dong-luong-phan-luc',
    contentMarkdown: `# Động lượng và Va chạm

Động lượng là đại lượng véctơ đặc trưng cho khả năng truyền tương tác chuyển động của một vật:
- **Véctơ động lượng**:
$$\\vec{p} = m \\cdot \\vec{v}$$
Đơn vị động lượng: $kg \\cdot m/s$ hoặc $N \\cdot s$.
- **Định luật bảo toàn động lượng**: Trong một hệ kín (không có ngoại lực tác dụng hoặc tổng ngoại lực triệt tiêu), tổng động lượng của hệ là một đại lượng bảo toàn:
$$\\vec{p}_1 + \\vec{p}_2 = \\vec{p}'_1 + \\vec{p}'_2$$
- **Chuyển động bằng phản lực**: Khi tên lửa phun khí phụt mạnh về phía sau với vận tốc lớn, thân tên lửa sẽ thu được vận tốc lao vút về phía trước theo nguyên lý bảo toàn động lượng:
$$m_{tenlua} \\cdot \\vec{v}_{tenlua} + m_{khi} \\cdot \\vec{v}_{khi} = \\vec{0}$$`,
    summary: 'Động lượng p = m.v. Trong hệ kín, tổng động lượng bảo toàn. Ứng dụng giải bài toán va chạm và phóng tên lửa.',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Giúp học sinh làm quen với phương pháp véctơ trong va chạm cơ học và nguyên lý hoạt động của động cơ phản lực hàng không vũ trụ.',
      misconceptions: [
        'Học sinh thường cộng đại số độ lớn động lượng thay vì cộng véctơ theo đúng phương hướng chuyển động.',
        'Nghĩ rằng tên lửa bay được trong không gian là nhờ luồng khí đẩy vào không khí bên ngoài (thực tế tên lửa bay trong chân không còn nhanh hơn vì không có lực cản).'
      ],
      guiding_questions: [
        'Khi một khẩu súng bắn đạn về phía trước, tại sao báng súng lại bị giật mạnh lùi về phía sau vào vai người bắn?',
        'Làm thế nào các phi thuyền không gian có thể chuyển hướng bay giữa chân không vũ trụ bao la?'
      ],
      home_experiments: [
        {
          title: 'Chiếc tên lửa bóng bay phản lực trên dây cước',
          materials: ['1 quả bóng bay dài', '1 đoạn ống hút nhựa ngắn 5 cm', '1 sợi dây cước dài 3 mét', 'Băng dính'],
          steps: [
            'Luồn sợi dây cước qua ống hút, buộc căng dây ngang phòng.',
            'Thổi căng quả bóng bay và dùng tay kẹp chặt miệng bóng (không buộc nút).',
            'Dùng băng dính dán quả bóng vào ống hút sao cho miệng bóng hướng về phía sau.',
            'Buông tay thả miệng bóng và quan sát tên lửa bóng bay lao vút đi.'
          ],
          expected_outcome: 'Khí phụt ra đằng sau làm quả bóng bay lao vút về phía trước theo định luật bảo toàn động lượng.',
          safety_notes: 'Kéo căng dây cước chắc chắn.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một viên đạn có khối lượng $m = 0.02\\text{ kg}$ bay với vận tốc $v = 600\\text{ m/s}$. Độ lớn động lượng $p$ của viên đạn là bao nhiêu kg.m/s?',
        latex_formula: 'p = m \\cdot v',
        correct_answer: '12',
        numeric_tolerance: 0.02,
        numeric_unit: 'kg.m/s',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Áp dụng công thức $p = m \\cdot v$ với $m = 0.02$ và $v = 600$.' }
        ],
        explanation: 'Độ lớn động lượng: $p = m \\cdot v = 0.02 \\cdot 600 = 12\\text{ kg} \\cdot \\text{m/s}$.'
      }
    ]
  },

  // ==========================================
  // GRADE 11 (High - 5 topics)
  // ==========================================
  {
    grade: 11,
    tier: 'high',
    topicTitle: 'Phương trình dao động, con lắc lò xo & con lắc đơn',
    slug: 'lop-11-con-lac-lo-xo-con-lac-don',
    topicDescription: 'Phương trình li độ x, vận tốc v, gia tốc a, chu kỳ dao động con lắc lò xo T = 2.pi.sqrt(m/k) và con lắc đơn.',
    icon: 'Clock',
    lessonTitle: 'Động học Dao động điều hòa',
    lessonSlug: 'dong-hoc-dao-dong-dieu-hoa',
    contentMarkdown: `# Động học Dao động điều hòa

Dao động điều hòa là dao động có li độ là hàm cosin của thời gian:
- Phương trình dao động:
$$x = A \\cdot \\cos(\\omega t + \\varphi)$$
- Phương trình vận tốc:
$$v = x' = -\\omega A \\cdot \\sin(\\omega t + \\varphi) = \\omega A \\cdot \\cos(\\omega t + \\varphi + \\frac{\\pi}{2})$$
Vận tốc sớm pha $\\frac{\\pi}{2}$ so với li độ. Giá trị cực đại $v_{max} = \\omega A$ tại vị trí cân bằng ($x = 0$).
- Phương trình gia tốc:
$$a = v' = -\\omega^2 A \\cdot \\cos(\\omega t + \\varphi) = -\\omega^2 x$$
Gia tốc ngược pha so với li độ. Giá trị cực đại $a_{max} = \\omega^2 A$ tại hai biên ($x = \\pm A$).
- Chu kỳ con lắc lò xo: $T = 2\\pi \\sqrt{\\frac{m}{k}}$
- Chu kỳ con lắc đơn: $T = 2\\pi \\sqrt{\\frac{l}{g}}$`,
    summary: 'Dao động điều hòa có li độ, vận tốc, gia tốc biến thiên điều hòa theo thời gian với độ lệch pha tương ứng.',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Giúp học sinh vẽ đường tròn lượng giác Fresnel để xác định pha dao động, li độ và vận tốc tức thời.',
      misconceptions: [
        'Học sinh thường nghĩ khi vật đi qua vị trí cân bằng (x = 0) thì gia tốc đạt giá trị cực đại (thực tế a = 0 vì a = -w^2.x).',
        'Nghĩ biên độ dao động càng lớn thì chu kỳ con lắc lò xo càng dài (chu kỳ độc lập với biên độ).'
      ],
      guiding_questions: [
        'Tại sao chiếc đồng hồ quả lắc treo tường chạy nhanh chậm khi thời tiết chuyển mùa từ hè nóng sang đông lạnh?',
        'Tại vị trí cân bằng của con lắc lò xo, li độ bằng bao nhiêu và vận tốc có độ lớn như thế nào?'
      ],
      home_experiments: [
        {
          title: 'Khảo sát tính chu kỳ của con lắc đơn tại nhà',
          materials: ['1 sợi dây dài chính xác 1 mét', '1 quả cầu nặng nhỏ', 'Đồng hồ bấm giây'],
          steps: [
            'Buộc vật nặng vào dây, kéo lệch góc nhỏ $5^\\circ$ rồi buông tay.',
            'Đo thời gian thực hiện 10 dao động toàn phần.',
            'Chia 10 để tính chu kỳ thực nghiệm $T$, so sánh với công thức lý thuyết $T = 2\\pi\\sqrt{\\frac{1}{9.8}} \\approx 2.0\\text{ s}$.'
          ],
          expected_outcome: 'Chu kỳ đo được xấp xỉ đúng 2.0 giây, nghiệm đúng công thức con lắc đơn chu kỳ giây.',
          safety_notes: 'Treo chắc chắn tránh tuột móc treo.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một chất điểm dao động điều hòa với biên độ $A = 5\\text{ cm}$ và tần số góc $\\omega = 10\\text{ rad/s}$. Tốc độ cực đại $v_{max}$ của chất điểm khi đi qua vị trí cân bằng là bao nhiêu cm/s?',
        latex_formula: 'v_{max} = \\omega \\cdot A',
        correct_answer: '50',
        numeric_tolerance: 0.02,
        numeric_unit: 'cm/s',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Tốc độ cực đại tại vị trí cân bằng tính bằng: $v_{max} = \\omega \\cdot A$.' }
        ],
        explanation: 'Tốc độ cực đại: $v_{max} = \\omega \\cdot A = 10 \\cdot 5 = 50\\text{ cm/s}$.'
      }
    ]
  },
  {
    grade: 11,
    tier: 'high',
    topicTitle: 'Năng lượng dao động & Hiện tượng cộng hưởng',
    slug: 'lop-11-nang-luong-dao-dong-cong-huong',
    topicDescription: 'Cơ năng W = 1/2.k.A^2, sự chuyển hóa động năng - thế năng, dao động tắt dần, dao động cưỡng bức và cộng hưởng.',
    icon: 'Radio',
    lessonTitle: 'Cơ năng và Hiện tượng Cộng hưởng',
    lessonSlug: 'co-nang-va-cong-huong',
    contentMarkdown: `# Năng lượng dao động và Cộng hưởng

Trong dao động điều hòa của con lắc lò xo:
- **Động năng**: $W_d = \\frac{1}{2} m v^2 = \\frac{1}{2} m \\omega^2 A^2 \\sin^2(\\omega t + \\varphi)$
- **Thế năng**: $W_t = \\frac{1}{2} k x^2 = \\frac{1}{2} k A^2 \\cos^2(\\omega t + \\varphi)$
- **Cơ năng bảo toàn**:
$$W = W_d + W_t = \\frac{1}{2} k A^2 = \\frac{1}{2} m \\omega^2 A^2 = \\text{hằng số}$$
Động năng và thế năng biến thiên tuần hoàn với tần số góc $2\\omega$ và chu kỳ $\\frac{T}{2}$.
- **Hiện tượng cộng hưởng**: Khi tần số của ngoại lực cưỡng bức $f$ bằng tần số dao động riêng $f_0$ của hệ ($f = f_0$), biên độ dao động cưỡng bức tăng vọt đạt giá trị cực đại. Ứng dụng: Bộ cộng hưởng âm thanh đàn ghi-ta; cần tránh cộng hưởng làm sập cầu, nứt vỡ công trình.`,
    summary: 'Cơ năng tỉ lệ với bình phương biên độ W ~ A^2. Hiện tượng cộng hưởng xảy ra khi tần số cưỡng bức bằng tần số riêng.',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Giúp học sinh hiểu tại sao một đoàn quân khi hành quân qua cầu treo phải đổi bước đi không đều để tránh cộng hưởng phá hủy cầu.',
      misconceptions: [
        'Học sinh nghĩ động năng và thế năng dao động cùng tần số với li độ (thực tế tần số gấp đôi).',
        'Nghĩ rằng hiện tượng cộng hưởng luôn gây hại (thực tế hộp đàn ghita, máy đo địa chấn rất cần cộng hưởng).'
      ],
      guiding_questions: [
        'Tại sao giọng hát cực cao của ca sĩ opera có thể làm vỡ tan chiếc ly thủy tinh mỏng đặt trên bàn?',
        'Cơ năng của con lắc lò xo biến đổi như thế nào nếu biên độ dao động tăng lên gấp 2 lần?'
      ],
      home_experiments: [
        {
          title: 'Khảo sát cộng hưởng với hai con lắc cùng chiều dài',
          materials: ['2 con lắc đơn có chiều dài dây bằng nhau 40 cm', '1 sợi dây giăng ngang nối 2 con lắc'],
          steps: [
            'Treo 2 con lắc lên cùng một sợi dây giăng ngang.',
            'Kéo 1 con lắc dao động, con lắc thứ hai ban đầu đứng yên.',
            'Quan sát năng lượng truyền qua dây giăng làm con lắc thứ hai dao động mạnh dần lên.'
          ],
          expected_outcome: 'Con lắc thứ hai hấp thụ năng lượng và dao động với biên độ cực đại vì cùng tần số riêng (hiện tượng cộng hưởng).',
          safety_notes: 'Giăng dây chắc chắn.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Hiện tượng cộng hưởng cơ học xảy ra khi điều kiện nào sau đây được thỏa mãn?',
        options: [
          { id: 'A', text: 'Tần số của ngoại lực cưỡng bức bằng tần số dao động riêng của hệ' },
          { id: 'B', text: 'Biên độ dao động giảm dần về số 0' },
          { id: 'C', text: 'Hệ hoàn toàn không có ma sát với môi trường' },
          { id: 'D', text: 'Gia tốc của vật luôn luôn bằng hằng số' }
        ],
        correct_answer: 'A',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Sự ăn khớp về mặt tần số giữa lực kích thích bên ngoài và dao động nội tại của hệ.' }
        ],
        explanation: 'Cộng hưởng xảy ra khi tần số ngoại lực cưỡng bức bằng tần số dao động riêng của hệ ($f = f_0$).'
      }
    ]
  },
  {
    grade: 11,
    tier: 'high',
    topicTitle: 'Sóng cơ, giao thoa sóng và sóng dừng',
    slug: 'lop-11-giao-thoa-song-song-dung',
    topicDescription: 'Bước sóng lambda = v/f, phương trình sóng, điều kiện cực đại cực tiểu giao thoa và sóng dừng trên sợi dây.',
    icon: 'Wifi',
    lessonTitle: 'Giao thoa Sóng và Sóng dừng',
    lessonSlug: 'giao-thoa-song-va-song-dung',
    contentMarkdown: `# Hiện tượng Sóng cơ học

Sóng cơ là sự lan truyền dao động trong môi trường vật chất theo thời gian:
- **Bước sóng** ($\\lambda$): Là quãng đường sóng truyền đi trong một chu kỳ:
$$\\lambda = v \\cdot T = \\frac{v}{f}$$
- **Giao thoa sóng**: Hai sóng kết hợp gặp nhau tạo nên các vân cực đại xen kẽ các vân cực tiểu:
  - Cực đại giao thoa: $d_2 - d_1 = k \\cdot \\lambda$ ($k \\in \\mathbb{Z}$).
  - Cực tiểu giao thoa: $d_2 - d_1 = (k + 0.5) \\cdot \\lambda$.
- **Sóng dừng**: Tạo bởi sự giao thoa giữa sóng tới và sóng phản xạ trên cùng phương truyền:
  - Nút sóng: Điểm đứng yên không dao động.
  - Bụng sóng: Điểm dao động với biên độ cực đại ($2A$).
  - Khoảng cách giữa hai nút liên tiếp (hoặc hai bụng liên tiếp) bằng nửa bước sóng: $\\frac{\\lambda}{2}$.
  - Dây hai đầu cố định: Chiều dài dây thỏa mãn $l = k \\cdot \\frac{\\lambda}{2}$ ($k$ là số bụng sóng).`,
    summary: 'Bước sóng lambda = v/f. Giao thoa tạo vân cực đại, cực tiểu. Sóng dừng có các nút và bụng sóng xen kẽ cách nhau lambda/2.',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Giúp học sinh liên hệ hiện tượng sóng dừng với nguyên lý phát âm thanh trên dây đàn ghi-ta, vĩ cầm và sáo trúc.',
      misconceptions: [
        'Học sinh nhầm lẫn tốc độ truyền sóng (vận tốc lan truyền pha) với tốc độ dao động của các phần tử vật chất.',
        'Nghĩ khoảng cách giữa 2 nút sóng liên tiếp là một bước sóng (chính xác là nửa bước sóng lambda/2).'
      ],
      guiding_questions: [
        'Khi người nghệ sĩ gảy dây đàn ghita, dạng sóng hình thành trên sợi dây đàn là sóng chạy hay sóng dừng?',
        'Khoảng cách giữa hai điểm đứng yên (hai nút sóng) liên tiếp trên sợi dây có sóng dừng bằng bao nhiêu phần bước sóng?'
      ],
      home_experiments: [
        {
          title: 'Tạo sóng dừng trên sợi dây cao su co dãn',
          materials: ['1 sợi dây chun dệt dài 2 mét', 'Móc cố định một đầu vào tay nắm cửa'],
          steps: [
            'Cầm đầu kia của dây, kéo căng vừa phải.',
            'Vung tay lên xuống nhịp nhàng với tần số tăng dần.',
            'Quan sát khi đạt tần số thích hợp, trên dây xuất hiện các múi sóng dừng cố định với các nút đứng yên và bụng dao động phồng to.'
          ],
          expected_outcome: 'Học sinh nhìn thấy tận mắt các nút sóng và bụng sóng hình thành ổn định trên dây.',
          safety_notes: 'Cầm chắc đầu dây.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một sóng cơ lan truyền với tần số $f = 50\\text{ Hz}$ và tốc độ truyền sóng $v = 150\\text{ m/s}$. Bước sóng $\\lambda$ của sóng này là bao nhiêu mét (m)?',
        latex_formula: '\\lambda = \\frac{v}{f}',
        correct_answer: '3',
        numeric_tolerance: 0.02,
        numeric_unit: 'm',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Áp dụng công thức tính bước sóng: $\\lambda = \\frac{v}{f}$ với $v = 150$ và $f = 50$.' }
        ],
        explanation: 'Bước sóng tính bằng: $\\lambda = \\frac{v}{f} = \\frac{150}{50} = 3\\text{ m}$.'
      }
    ]
  },
  {
    grade: 11,
    tier: 'high',
    topicTitle: 'Điện trường, điện thế và tụ điện',
    slug: 'lop-11-dien-truong-tu-dien',
    topicDescription: 'Cường độ điện trường E = F/q = U/d, điện thế, hiệu điện thế và điện dung của tụ điện C = Q/U.',
    icon: 'ZapOff',
    lessonTitle: 'Điện trường tĩnh và Tụ điện',
    lessonSlug: 'dien-truong-va-tu-dien',
    contentMarkdown: `# Điện trường và Tụ điện

Không gian xung quanh điện tích tồn tại điện trường:
- **Cường độ điện trường** ($\\vec{E}$): Đặc trưng cho tác dụng lực của điện trường:
$$E = \\frac{F}{|q|}$$
Trong điện trường đều giữa hai bản kim loại tích điện trái dấu phẳng song song:
$$E = \\frac{U}{d}$$
Đơn vị: Vôn trên mét ($V/m$).
- **Tụ điện**: Hệ gồm hai vật dẫn đặt gần nhau và ngăn cách nhau bằng một lớp điện môi, có nhiệm vụ tích và phóng điện tích:
$$C = \\frac{Q}{U}$$
Trong đó:
- $Q$ là điện tích của tụ (đơn vị: Culông, $C$).
- $U$ là hiệu điện thế giữa hai bản tụ (đơn vị: Vôn, $V$).
- $C$ là điện dung của tụ (đơn vị: Fara, $F$).
- Năng lượng điện trường tích trữ trong tụ: $W = \\frac{1}{2} C U^2 = \\frac{1}{2} \\frac{Q^2}{C}$.`,
    summary: 'Điện trường tác dụng lực lên điện tích. Trong điện trường đều E = U/d. Tụ điện tích trữ năng lượng W = 1/2.C.U^2.',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Giúp học sinh hiểu cấu tạo tụ điện trong mạch điện tử tử, đèn flash điện thoại và nguyên lý phóng tia sét trong cơn dông.',
      misconceptions: [
        'Học sinh nghĩ tụ điện lưu trữ điện tích vĩnh viễn như pin hóa học.',
        'Nhầm lẫn chiều đường sức điện trường (đi ra từ điện tích dương, đi vào điện tích âm).'
      ],
      guiding_questions: [
        'Tia sét khổng lồ chớp sáng trong cơn mưa dông phóng điện qua chất cách điện không khí theo nguyên lý nào?',
        'Để tăng khả năng tích điện của tụ điện ở cùng một hiệu điện thế, người ta cần tăng đại lượng nào của tụ?'
      ],
      home_experiments: [
        {
          title: 'Khảo sát điện trường tĩnh điện bằng quả bóng bay cọ xát',
          materials: ['1 quả bóng bay cao su', 'Mảnh vải len khô', 'Dòng nước nhỏ chảy từ vòi bồn rửa'],
          steps: [
            'Thổi căng quả bóng bay, cọ xát mạnh vào mảnh vải len nhiều lần để nhiễm điện.',
            'Mở vòi nước cho một dòng nước nhỏ chảy êm thẳng đứng.',
            'Đưa quả bóng nhiễm điện lại gần dòng nước (cách 1 - 2 cm).'
          ],
          expected_outcome: 'Dòng nước bị uốn cong lệch về phía quả bóng dưới tác dụng của lực điện trường tĩnh điện.',
          safety_notes: 'Không làm ướt quả bóng trước khi thí nghiệm.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Giữa hai bản kim loại phẳng song song cách nhau một khoảng $d = 0.02\\text{ m}$ có hiệu điện thế $U = 100\\text{ V}$. Cường độ điện trường đều $E$ giữa hai bản là bao nhiêu V/m?',
        latex_formula: 'E = \\frac{U}{d}',
        correct_answer: '5000',
        numeric_tolerance: 0.02,
        numeric_unit: 'V/m',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Áp dụng công thức điện trường đều: $E = \\frac{U}{d}$ với $U = 100\\text{ V}$ và $d = 0.02\\text{ m}$.' }
        ],
        explanation: 'Cường độ điện trường: $E = \\frac{U}{d} = \\frac{100}{0.02} = 5000\\text{ V/m}$.'
      }
    ]
  },
  {
    grade: 11,
    tier: 'high',
    topicTitle: 'Dòng điện không đổi & Định luật Ohm toàn mạch',
    slug: 'lop-11-dinh-luat-ohm-toan-mach',
    topicDescription: 'Suất điện động E và điện trở trong r của nguồn, định luật Ohm toàn mạch I = E/(R + r), hiệu suất nguồn điện.',
    icon: 'Cpu',
    lessonTitle: 'Định luật Ohm cho toàn mạch',
    lessonSlug: 'dinh-luat-ohm-toan-mach',
    contentMarkdown: `# Toàn mạch điện và Suất điện động

Nguồn điện duy trì hiệu điện thế ổn định để dòng điện chạy liên tục:
- **Nguồn điện**: Đặc trưng bởi **suất điện động** ($\\mathcal{E}$, đơn vị Vôn) và **điện trở trong** ($r$, đơn vị Ôm).
- **Định luật Ohm cho toàn mạch**: Cường độ dòng điện chạy trong mạch kín tỷ lệ thuận với suất điện động của nguồn và tỷ lệ nghịch với điện trở toàn phần:
$$I = \\frac{\\mathcal{E}}{R_N + r}$$
Trong đó:
- $R_N$ là điện trở tương đương của mạch ngoài.
- $r$ là điện trở trong của nguồn điện.
- **Hiệu điện thế mạch ngoài**:
$$U_N = I \\cdot R_N = \\mathcal{E} - I \\cdot r$$
- **Hiện tượng đoản mạch (ngắn mạch)**: Xảy ra khi nối tắt hai cực của nguồn bằng dây dẫn có điện trở rất nhỏ ($R_N \\approx 0$), khi đó dòng điện tăng vọt $I = \\frac{\\mathcal{E}}{r}$ gây nóng bốc cháy nguồn điện.`,
    summary: 'Định luật Ohm toàn mạch: I = E/(RN + r). Khi RN = 0 xảy ra hiện tượng đoản mạch nguy hiểm.',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Giúp học sinh hiểu tại sao một viên pin cũ đo không tải thì đủ 1.5V nhưng khi lắp vào đồ chơi lại không chạy được (do điện trở trong r tăng vọt).',
      misconceptions: [
        'Học sinh thường quên tính điện trở trong r của nguồn khi tính dòng điện trong mạch.',
        'Nghĩ rằng hiệu điện thế mạch ngoài Un luôn luôn bằng suất điện động E trong mọi trường hợp.'
      ],
      guiding_questions: [
        'Hiện tượng đoản mạch (chập điện) trong gia đình nguy hiểm như thế nào và thiết bị nào giúp ngắt mạch tự động?',
        'Khi một chiếc xe ô tô đề nổ máy khởi động, tại sao đèn pha phía trước bị mờ tối đi trong chốc lát?'
      ],
      home_experiments: [
        {
          title: 'Khảo sát hiện tượng tụt áp của quả pin cũ bằng đồng hồ vạn năng',
          materials: ['1 viên pin 9V cũ', '1 đồng hồ đo VOM', '1 điện trở tải 100 Ôm'],
          steps: [
            'Đo hiệu điện thế hai cực của pin khi chưa nối tải (đo suất điện động $\\mathcal{E}$).',
            'Nối điện trở tải vào hai cực của pin và đo lại hiệu điện thế mạch ngoài $U_N$.'
          ],
          expected_outcome: 'Hiệu điện thế $U_N$ bị sụt giảm rõ rệt so với $\\mathcal{E}$ do độ sụt áp $I \\cdot r$ trên điện trở trong của pin.',
          safety_notes: 'Không đoản mạch trực tiếp pin 9V.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một nguồn điện có suất điện động $\\mathcal{E} = 12\\text{ V}$ và điện trở trong $r = 1\\,\\Omega$ nối với mạch ngoài có điện trở $R_N = 5\\,\\Omega$. Cường độ dòng điện $I$ trong mạch là bao nhiêu Ampe (A)?',
        latex_formula: 'I = \\frac{\\mathcal{E}}{R_N + r}',
        correct_answer: '2',
        numeric_tolerance: 0.02,
        numeric_unit: 'A',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Áp dụng định luật Ohm toàn mạch: $I = \\frac{\\mathcal{E}}{R_N + r}$ với $\\mathcal{E} = 12$, $R_N = 5$, $r = 1$.' }
        ],
        explanation: 'Cường độ dòng điện: $I = \\frac{\\mathcal{E}}{R_N + r} = \\frac{12}{5 + 1} = 2\\text{ A}$.'
      }
    ]
  },

  // ==========================================
  // GRADE 12 (High - 5 topics)
  // ==========================================
  {
    grade: 12,
    tier: 'high',
    topicTitle: 'Phương trình trạng thái khí lý tưởng',
    slug: 'lop-12-phuong-trinh-khi-ly-tuong',
    topicDescription: 'Các định luật chất khí (Boyle-Mariotte, Charles) và phương trình tổng quát pV/T = hằng số, pV = nRT.',
    icon: 'Box',
    lessonTitle: 'Thuyết động học và Khí lý tưởng',
    lessonSlug: 'phuong-trinh-khi-ly-tuong',
    contentMarkdown: `# Phương trình trạng thái khí lý tưởng

Khí lý tưởng là mô hình khí mà các phân tử được coi là chất điểm và chỉ tương tác khi va chạm:
- Các quá trình biến đổi trạng thái đặc biệt:
  - **Quá trình đẳng nhiệt** (Nhiệt độ $T$ không đổi - Định luật Boyle - Mariotte):
$$p_1 \\cdot V_1 = p_2 \\cdot V_2$$
  - **Quá trình đẳng tích** (Thể tích $V$ không đổi - Định luật Charles):
$$\\frac{p_1}{T_1} = \\frac{p_2}{T_2}$$
  - **Quá trình đẳng áp** (Áp suất $p$ không đổi - Định luật Gay - Lussac):
$$\\frac{V_1}{T_1} = \\frac{V_2}{T_2}$$
- **Phương trình Clapeyron - Mendeleev**:
$$p \\cdot V = n \\cdot R \\cdot T = \\frac{m}{M} R \\cdot T$$
Trong đó:
- $p$ là áp suất (đơn vị: $Pa$ hoặc $atm$).
- $V$ là thể tích ($m^3$).
- $T = t(^\\circ\\text{C}) + 273.15$ là nhiệt độ tuyệt đối (Kenvin, $K$).
- $R \\approx 8.31\\text{ J/(mol} \\cdot \\text{K)}$ là hằng số khí lý tưởng.`,
    summary: 'Phương trình trạng thái: pV/T = const. Đẳng nhiệt pV = const, đẳng tích p/T = const, đẳng áp V/T = const.',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Giúp học sinh luôn nhớ đổi nhiệt độ sang Kenvin (T = t + 273) trong tất cả các bài toán chất khí.',
      misconceptions: [
        'Học sinh thường quên đổi độ C sang Kenvin dẫn đến giải sai toàn bộ các bài toán đẳng tích và đẳng áp.',
        'Nghĩ rằng nhiệt độ 0 độ C là phân tử khí đã ngừng chuyển động hoàn toàn (0 K = -273.15 độ C mới là độ không tuyệt đối).'
      ],
      guiding_questions: [
        'Tại sao săm lốp xe máy bơm căng để ngoài sân bê tông nắng gắt mùa hè lại rất dễ bị nổ lốp?',
        'Khi nhúng quả bóng bàn bị bẹp móp vào bát nước sôi nóng, điều gì làm quả bóng tự phồng căng trở lại?'
      ],
      home_experiments: [
        {
          title: 'Khảo sát định luật Charles với vỏ chai nhựa trong tủ lạnh',
          materials: ['1 chai nhựa rỗng có nắp kín', 'Ngăn đá tủ lạnh'],
          steps: [
            'Mở nắp chai nhựa ở nhiệt độ phòng, vặn nắp thật chặt.',
            'Cho chai vào ngăn đá tủ lạnh trong 30 phút.',
            'Lấy chai ra quan sát thành chai.'
          ],
          expected_outcome: 'Thành chai bị móp méo co dúm lại do nhiệt độ giảm làm áp suất và thể tích khí bên trong giảm theo.',
          safety_notes: 'Thực hiện đơn giản, an toàn.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một khối khí lý tưởng trong xilanh có thể tích ban đầu $V_1 = 4\\text{ lít}$ ở áp suất $p_1 = 1\\text{ atm}$. Nén đẳng nhiệt khối khí này đến thể tích $V_2 = 2\\text{ lít}$. Áp suất $p_2$ của khối khí sau khi nén là bao nhiêu atm?',
        latex_formula: 'p_2 = \\frac{p_1 \\cdot V_1}{V_2}',
        correct_answer: '2',
        numeric_tolerance: 0.02,
        numeric_unit: 'atm',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Áp dụng định luật Boyle - Mariotte cho quá trình đẳng nhiệt: $p_1 \\cdot V_1 = p_2 \\cdot V_2$.' }
        ],
        explanation: 'Áp suất sau khi nén: $p_2 = \\frac{p_1 \\cdot V_1}{V_2} = \\frac{1 \\cdot 4}{2} = 2\\text{ atm}$.'
      }
    ]
  },
  {
    grade: 12,
    tier: 'high',
    topicTitle: 'Nội năng & Định luật I nhiệt động lực học',
    slug: 'lop-12-noi-nang-nhiet-dong-luc-hoc',
    topicDescription: 'Khái niệm nội năng U, hai cách làm biến đổi nội năng (thực hiện công, truyền nhiệt) và định luật Delta_U = A + Q.',
    icon: 'ThermometerSnowflake',
    lessonTitle: 'Nguyên lý I Nhiệt động lực học',
    lessonSlug: 'nguyen-ly-i-nhiet-dong-luc-hoc',
    contentMarkdown: `# Nội năng và Nguyên lý I Nhiệt động lực học

Nội năng của một vật là tổng động năng chuyển động hỗn loạn của các phân tử và thế năng tương tác giữa chúng:
$$U = f(T, V)$$
- Có 2 cách làm biến đổi nội năng:
  1. **Thực hiện công**: Cọ xát đồng xu lên mặt bàn làm đồng xu nóng lên, ấn pít-tông nén khí.
  2. **Truyền nhiệt**: Đun nóng nước trên ngọn lửa, thả thìa nguội vào cốc nước nóng.
- **Định luật I Nhiệt động lực học**: Độ biến thiên nội năng của vật bằng tổng công và nhiệt lượng mà vật nhận được:
$$\\Delta U = A + Q$$
- **Quy ước dấu**:
  - $Q > 0$: Hệ nhận nhiệt lượng; $Q < 0$: Hệ truyền nhiệt lượng.
  - $A > 0$: Hệ nhận công; $A < 0$: Hệ thực hiện công lên vật khác.`,
    summary: 'Độ biến thiên nội năng Delta_U = A + Q. Quy ước dấu: nhận thì dương (+), truyền/sinh công thì âm (-).',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Giúp học sinh nắm vững quy ước dấu của A và Q để giải chính xác bài toán động cơ nhiệt và máy làm lạnh trong kỳ thi tốt nghiệp.',
      misconceptions: [
        'Học sinh hay nhầm dấu khi đề bài nói: "khí giãn nở sinh công" (phải lấy A < 0 khi xét cho khối khí).',
        'Nghĩ rằng nhiệt độ của khí tăng thì bắt buộc hệ phải nhận nhiệt lượng Q (thực tế nén đoạn nhiệt Q = 0 nhiệt độ vẫn tăng vọt).'
      ],
      guiding_questions: [
        'Khi con bơm xe đạp, tại sao sờ vào phần dưới của chiếc bơm con thấy thân bơm nóng ran lên?',
        'Một khối khí nhận nhiệt lượng $100\\text{ J}$ và sinh công $60\\text{ J}$ đẩy pít-tông, nội năng của khối khí tăng hay giảm bao nhiêu Jun?'
      ],
      home_experiments: [
        {
          title: 'Khảo sát biến thiên nội năng bằng cách uốn bẻ dây thép',
          materials: ['1 đoạn dây thép mềm hoặc chiếc kẹp ghim giấy lớn'],
          steps: [
            'Dùng hai tay bẻ gập qua gập lại liên tục chiếc kẹp giấy tại một điểm khoảng 20 lần thật nhanh.',
            'Chạm nhẹ ngay đầu ngón tay vào vị trí vừa bẻ gập.'
          ],
          expected_outcome: 'Chỗ gập nóng ran lên do cơ năng thực hiện công uốn kim loại chuyển hóa thành nội năng làm tăng nhiệt độ.',
          safety_notes: 'Chạm nhẹ tay cẩn thận tránh bỏng rát da.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Người ta truyền cho khối khí trong xilanh một nhiệt lượng $Q = 150\\text{ J}$. Khối khí dãn nở thực hiện một công $A\' = 50\\text{ J}$ đẩy pít-tông lên. Độ biến thiên nội năng $\\Delta U$ của khối khí là bao nhiêu Jun (J)?',
        latex_formula: '\\Delta U = Q + A',
        correct_answer: '100',
        numeric_tolerance: 0.02,
        numeric_unit: 'J',
        difficulty: 'medium',
        points: 10,
        hints: [
          { level: 1, hint: 'Khối khí sinh công nên $A = -A\' = -50\\text{ J}$. Áp dụng $\\Delta U = A + Q = -50 + 150$.' }
        ],
        explanation: 'Khối khí nhận nhiệt $Q = 150\\text{ J}$ và sinh công nên $A = -50\\text{ J}$. Độ biến thiên nội năng: $\\Delta U = 150 - 50 = 100\\text{ J}$.'
      }
    ]
  },
  {
    grade: 12,
    tier: 'high',
    topicTitle: 'Từ trường & Cảm ứng điện từ: Định luật Faraday và Lenz',
    slug: 'lop-12-dinh-luat-faraday-lenz',
    topicDescription: 'Từ thông Phi = B.S.cos(alpha), định luật Faraday ec = -Delta_Phi/Delta_t, định luật Lenz và hiện tượng tự cảm L.',
    icon: 'Magnet',
    lessonTitle: 'Định luật Cảm ứng điện từ Faraday và Lenz',
    lessonSlug: 'dinh-luat-faraday-va-lenz',
    contentMarkdown: `# Hiện tượng Cảm ứng điện từ định lượng

Nền tảng của toàn bộ nền công nghiệp điện năng hiện đại:
- **Từ thông** ($\\Phi$): Đo số lượng đường sức từ xuyên qua diện tích mạch kín:
$$\\Phi = B \\cdot S \\cdot \\cos\\alpha$$
Trong đó $\\alpha$ là góc giữa véctơ cảm ứng từ $\\vec{B}$ và véctơ pháp tuyến $\\vec{n}$. Đơn vị: Vêbe ($Wb$).
- **Định luật Faraday**: Độ lớn của suất điện động cảm ứng trong mạch kín tỷ lệ với tốc độ biến thiên từ thông:
$$e_c = -\\frac{\\Delta\\Phi}{\\Delta t}$$
- **Định luật Lenz**: Dòng điện cảm ứng xuất hiện có chiều sao cho từ trường do nó sinh ra có tác dụng chống lại sự biến thiên của từ thông sinh ra nó.
- **Hiện tượng tự cảm**: Là hiện tượng cảm ứng điện từ xảy ra trong chính mạch có dòng điện biến thiên:
$$e_{tc} = -L \\cdot \\frac{\\Delta i}{\\Delta t}$$
Với $L$ là hệ số tự cảm của ống dây (đơn vị: Hen-ri, $H$).`,
    summary: 'Từ thông Phi = B.S.cos(alpha). Suất điện động cảm ứng ec = -Delta_Phi/Delta_t tuân theo định luật Lenz chống lại sự biến thiên.',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Giúp học sinh vận dụng định luật Lenz để xác định chiều dòng điện cảm ứng và hiểu nguyên lý hoạt động của bếp từ gia đình.',
      misconceptions: [
        'Học sinh thường nhầm góc alpha là góc giữa B và mặt phẳng khung dây (phải là góc giữa B và pháp tuyến vuông góc n).',
        'Nghĩ rằng từ thông lớn thì suất điện động phải lớn (ec chỉ phụ thuộc tốc độ biến thiên chứ không phụ thuộc giá trị tuyệt đối của Phi).'
      ],
      guiding_questions: [
        'Tại sao bếp từ khi bật lên chỉ làm nóng xoong nồi có đáy bằng kim loại nhiễm từ còn mặt kính bếp thì không hề nóng rực?',
        'Khi đưa cực Bắc của thanh nam châm lại gần một vòng dây nhôm kín, vòng dây nhôm sẽ bị hút lại hay bị đẩy lùi ra xa?'
      ],
      home_experiments: [
        {
          title: 'Khảo sát dòng điện Foucault cản trở chuyển động',
          materials: ['1 ống đồng hoặc ống nhôm dày rỗng', '1 viên nam châm đất hiếm Neodymium mạnh', '1 viên bi sắt thường cùng kích thước'],
          steps: [
            'Thả viên bi sắt rơi qua lòng ống đồng (rơi vụt xuống đất trong 0.2 giây).',
            'Thả viên nam châm đất hiếm rơi qua lòng ống đồng và quan sát.'
          ],
          expected_outcome: 'Viên nam châm rơi từ từ lơ lửng mất 3 - 4 giây mới ra khỏi ống vì dòng điện Foucault sinh ra trong thành ống đồng tạo lực từ cản trở sự rơi theo định luật Lenz.',
          safety_notes: 'Cẩn thận không để kẹp ngón tay với nam châm đất hiếm mạnh.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Từ thông qua một khung dây dẫn kín giảm đều từ $\\Phi_1 = 0.8\\text{ Wb}$ xuống $\\Phi_2 = 0.2\\text{ Wb}$ trong khoảng thời gian $\\Delta t = 0.1\\text{ s}$. Độ lớn suất điện động cảm ứng xuất hiện trong khung dây là bao nhiêu Vôn (V)?',
        latex_formula: '|e_c| = \\left| \\frac{\\Delta\\Phi}{\\Delta t} \\right|',
        correct_answer: '6',
        numeric_tolerance: 0.02,
        numeric_unit: 'V',
        difficulty: 'medium',
        points: 10,
        hints: [
          { level: 1, hint: 'Độ biến thiên từ thông $|\\Delta\\Phi| = |0.2 - 0.8| = 0.6\\text{ Wb}$. Sau đó chia cho $\\Delta t = 0.1\\text{ s}$.' }
        ],
        explanation: 'Độ lớn suất điện động cảm ứng: $|e_c| = \\frac{|0.2 - 0.8|}{0.1} = 6\\text{ V}$.'
      }
    ]
  },
  {
    grade: 12,
    tier: 'high',
    topicTitle: 'Cấu tạo hạt nhân, năng lượng liên kết & Độ hụt khối',
    slug: 'lop-12-nang-luong-lien-ket-hat-nhan',
    topicDescription: 'Ký hiệu hạt nhân, proton, neutron, độ hụt khối Delta_m và năng lượng liên kết Elk = Delta_m.c^2.',
    icon: 'Atom',
    lessonTitle: 'Cấu tạo Hạt nhân và Năng lượng liên kết',
    lessonSlug: 'cau-tao-hat-nhan-nang-luong-lien-ket',
    contentMarkdown: `# Vật lý Hạt nhân nguyên tử

Hạt nhân nguyên tử nằm ở tâm nguyên tử, tích điện dương:
- Cấu tạo hạt nhân:
  - $Z$ prôtôn mang điện tích $+e$.
  - $N$ nơtrôn không mang điện ($N = A - Z$).
  - $A$ nuclôn (số khối): Ký hiệu hạt nhân là $^{A}_{Z}X$.
- **Hệ thức Einstein về năng lượng**:
$$E = m \\cdot c^2$$
- **Độ hụt khối** ($\\Delta m$): Khối lượng của hạt nhân luôn nhỏ hơn tổng khối lượng của các nuclôn riêng lẻ tạo thành nó:
$$\\Delta m = [Z \\cdot m_p + (A - Z)m_n] - m_X$$
- **Năng lượng liên kết** ($E_{lk}$): Năng lượng tỏa ra khi các nuclôn liên kết tạo thành hạt nhân:
$$E_{lk} = \\Delta m \\cdot c^2$$
- **Năng lượng liên kết riêng**: $\\frac{E_{lk}}{A}$ đặc trưng cho mức độ bền vững của hạt nhân (hạt nhân có số khối $50 < A < 95$ như sắt $^{56}_{26}Fe$ bền vững nhất).`,
    summary: 'Độ hụt khối Delta_m = tổng khối lượng nucleon trừ khối lượng hạt nhân. Năng lượng liên kết Elk = Delta_m.c^2.',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Giúp học sinh hiểu nguồn gốc năng lượng khổng lồ của phản ứng hạt nhân xuất phát từ sự biến đổi một lượng khối lượng cực nhỏ theo hệ thức Einstein.',
      misconceptions: [
        'Học sinh nghĩ định luật bảo toàn khối lượng cổ điển đúng trong phản ứng hạt nhân (trong hạt nhân khối lượng không bảo toàn, chỉ có năng lượng toàn phần bảo toàn).',
        'Nghĩ rằng hạt nhân càng nhiều nuclon thì càng bền vững (chính năng lượng liên kết riêng Elk/A mới quyết định độ bền vững).'
      ],
      guiding_questions: [
        'Hệ thức nổi tiếng nhất lịch sử nhân loại của Albert Einstein $E = mc^2$ có ý nghĩa vật lý như thế nào?',
        'Tại sao Mặt Trời có thể tỏa ra năng lượng ánh sáng và nhiệt khổng lồ sưởi ấm toàn bộ hệ Mặt Trời suốt hàng tỷ năm qua?'
      ],
      home_experiments: [
        {
          title: 'Khảo sát bảng hệ thống tuần hoàn các nguyên tố hạt nhân',
          materials: ['Bảng hệ thống tuần hoàn các nguyên tố hóa học', 'Sổ tay ghi chép'],
          steps: [
            'Tìm nguyên tố Heli $^{4}_{2}He$, xác định số proton Z = 2 và số neutron N = 4 - 2 = 2.',
            'Tìm nguyên tố Sắt $^{56}_{26}Fe$, xác định Z = 26 và N = 30.',
            'So sánh tỷ lệ số neutron trên proton khi số khối A tăng dần.'
          ],
          expected_outcome: 'Học sinh nhận thấy ở các hạt nhân nặng, số nơtrôn tăng nhanh hơn số prôtôn để tạo lực hạt nhân kéo các prôtôn lại gần nhau.',
          safety_notes: 'Thực hành tính toán giải bài tập lý thuyết an toàn.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Đại lượng vật lý nào sau đây đặc trưng cho mức độ BỀN VỮNG của một hạt nhân nguyên tử?',
        options: [
          { id: 'A', text: 'Năng lượng liên kết riêng (Elk / A)' },
          { id: 'B', text: 'Tổng số proton trong hạt nhân' },
          { id: 'C', text: 'Khối lượng toàn phần của hạt nhân' },
          { id: 'D', text: 'Kích thước hình học của nguyên tử' }
        ],
        correct_answer: 'A',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Năng lượng liên kết tính trên một đơn vị nuclôn (hạt nhân có đại lượng này càng lớn thì càng bền vững).' }
        ],
        explanation: 'Năng lượng liên kết riêng $\\frac{E_{lk}}{A}$ là đại lượng đặc trưng cho độ bền vững của hạt nhân.'
      }
    ]
  },
  {
    grade: 12,
    tier: 'high',
    topicTitle: 'Phóng xạ, phân hạch và phản ứng nhiệt hạch',
    slug: 'lop-12-phong-xa-phan-hach-nhiet-hach',
    topicDescription: 'Định luật phóng xạ N(t) = N0.2^(-t/T), chu kỳ bán rã, tia phóng xạ, phân hạch hạt nhân và phản ứng nhiệt hạch.',
    icon: 'AlertTriangle',
    lessonTitle: 'Phóng xạ và Năng lượng Hạt nhân',
    lessonSlug: 'phong-xa-va-nang-luong-hat-nhan',
    contentMarkdown: `# Phóng xạ và Phản ứng Hạt nhân

Phóng xạ là quá trình hạt nhân không bền vững tự phân rã và phát ra các tia phóng xạ:
- Các loại tia phóng xạ:
  - **Tia $\\alpha$** (dòng hạt nhân $^{4}_{2}He$): Khả năng ion hóa mạnh, đâm xuyên kém (bị tờ giấy chặn lại).
  - **Tia $\\beta^-$** (dòng electron $^{0}_{-1}e$) và **tia $\\beta^+$** (dòng pozitron $^{0}_{1}e$): Đâm xuyên trung bình (bị lá nhôm dày vài mm chặn lại).
  - **Tia $\\gamma$** (sóng điện từ bước sóng cực ngắn): Đâm xuyên cực mạnh, cần tấm chì dày vài chục cm để che chắn.
- **Định luật phóng xạ**:
$$N(t) = N_0 \\cdot 2^{-\\frac{t}{T}} = N_0 \\cdot e^{-\\lambda t}$$
Với $T$ là **chu kỳ bán rã** (thời gian để một nửa số hạt nhân bị phân rã), $\\lambda = \\frac{\\ln 2}{T}$ là hằng số phóng xạ.
- **Phân hạch**: Hạt nhân rất nặng (Uranium $^{235}U$) bắt nơtrôn chậm vỡ thành 2 hạt nhân nhẹ hơn và tỏa năng lượng lớn (lò phản ứng hạt nhân).
- **Nhiệt hạch**: Kết hợp 2 hạt nhân rất nhẹ thành hạt nhân nặng hơn ở nhiệt độ hàng trăm triệu độ (trong lòng Mặt Trời, bom H).`,
    summary: 'Định luật phóng xạ: N(t) = N0.2^(-t/T). Phân hạch tách hạt nhân nặng, nhiệt hạch kết hợp hạt nhân nhẹ tỏa năng lượng siêu lớn.',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Giúp học sinh hiểu ứng dụng bức xạ trong y học (chụp X-quang, xạ trị ung thư), phương pháp định tuổi cổ vật bằng carbon C-14 và an toàn bức xạ.',
      misconceptions: [
        'Học sinh nghĩ sau thời gian 2 chu kỳ bán rã (t = 2T) thì chất phóng xạ phân rã hết 100% (thực tế còn lại 25%).',
        'Nghĩ rằng mọi chất phóng xạ đều nguy hiểm chết người ngay lập tức.'
      ],
      guiding_questions: [
        'Làm thế nào các nhà khảo cổ học có thể xác định được tuổi của một xác ướp Ai Cập cổ đại đã chôn cất cách đây 3000 năm bằng đồng vị carbon C-14?',
        'Tại sao năng lượng nhiệt hạch được coi là nguồn năng lượng tương lai sạch và an toàn hơn năng lượng phân hạch hạt nhân?'
      ],
      home_experiments: [
        {
          title: 'Mô phỏng chu kỳ bán rã bằng tung đồng xu ngẫu nhiên',
          materials: ['50 đồng xu nhỏ giống nhau (hoặc 50 viên kẹo hai mặt)', '1 chiếc khay lớn'],
          steps: [
            'Cho 50 đồng xu vào khay (số hạt nhân ban đầu $N_0 = 50$).',
            'Lắc đều và tung xuống bàn. Các đồng xu ngửa coi như đã phân rã thì nhặt ra ngoài.',
            'Đếm số đồng xu sấp còn lại ($N_1$).',
            'Lặp lại thêm 3 lần nữa và ghi lại đồ thị số lượng đồng xu còn lại theo số lần tung.'
          ],
          expected_outcome: 'Sau mỗi lần tung, số lượng đồng xu còn lại xấp xỉ giảm đi một nửa (50 -> 25 -> 12 -> 6), minh họa trực quan định luật phân rã phóng xạ hàm mũ.',
          safety_notes: 'Thực hành vui vẻ, an toàn.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Chất phóng xạ có chu kỳ bán rã $T = 8\\text{ ngày}$. Ban đầu có $N_0 = 1000\\text{ g}$ chất phóng xạ nguyên chất. Sau thời gian $t = 24\\text{ ngày}$, khối lượng chất phóng xạ còn lại chưa bị phân rã là bao nhiêu gam (g)?',
        latex_formula: 'm(t) = m_0 \\cdot 2^{-\\frac{t}{T}}',
        correct_answer: '125',
        numeric_tolerance: 0.02,
        numeric_unit: 'g',
        difficulty: 'medium',
        points: 10,
        hints: [
          { level: 1, hint: 'Số chu kỳ bán rã đã trôi qua: $k = \\frac{t}{T} = \\frac{24}{8} = 3$. Sau 3 chu kỳ, khối lượng còn lại bằng $\\frac{m_0}{2^3} = \\frac{1000}{8}$.' }
        ],
        explanation: 'Khối lượng còn lại sau 3 chu kỳ bán rã: $m = \\frac{1000}{2^3} = \\frac{1000}{8} = 125\\text{ g}$.'
      }
    ]
  }
];

console.log(`Generated ${topicsPart4.length} topics for grades 10, 11 & 12.`);

// Verify KaTeX
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

for (const t of topicsPart4) {
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
console.log('Verified KaTeX in grades 10, 11 & 12 successfully.');

fs.writeFileSync(path.resolve(__dirname, 'temp_grades_10_12.json'), JSON.stringify(topicsPart4, null, 2), 'utf-8');
