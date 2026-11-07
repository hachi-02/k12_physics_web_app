// D:\k12_physics_web_app\scripts\append_grades_6_to_12.js
const fs = require('fs');
const path = require('path');
const katex = require('katex');

const topicsPart2 = [
  // ==========================================
  // GRADE 6 (Middle - 4 topics)
  // ==========================================
  {
    grade: 6,
    tier: 'middle',
    topicTitle: 'Đo chiều dài, thể tích và khối lượng',
    slug: 'lop-6-do-luong-vat-ly',
    topicDescription: 'Sử dụng thước kẹp, bình chia độ và cân điện tử để đo các đại lượng cơ bản.',
    icon: 'Ruler',
    lessonTitle: 'Phương pháp đo lường trong Vật lý',
    lessonSlug: 'phuong-phap-do-luong',
    contentMarkdown: `# Các phép đo lường cơ bản

Mọi nghiên cứu vật lý đều bắt đầu từ các phép đo lường chính xác:
- **Đo chiều dài**: Dùng thước cuộn, thước kẻ, thước kẹp. Đơn vị chuẩn trong hệ SI là mét ($m$).
- **Đo thể tích chất lỏng và vật rắn không thấm nước**: Dùng bình chia độ hoặc bình tràn. Đơn vị: lít ($L$) hoặc mét khối ($m^3$).
- **Đo khối lượng**: Dùng cân Rô-béc-van, cân đòn hoặc cân điện tử. Đơn vị: kilôgam ($kg$).

Khi đo cần đặt mắt vuông góc với vạch chia và ước lượng đến nửa độ chia nhỏ nhất để giảm sai số.`,
    summary: 'Đo lường là nền tảng của vật lý. Cần chọn dụng cụ đo phù hợp với giới hạn đo và độ chia nhỏ nhất.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Hướng dẫn con kỹ năng thực hành đo lường chuẩn xác, cách đọc vạch chia và hiểu khái niệm sai số thực nghiệm.',
      misconceptions: [
        'Học sinh thường nhầm lẫn giữa khối lượng (lượng chất tính bằng kg) và trọng lượng (lực hút tính bằng N).',
        'Nghĩ rằng đặt mắt nhìn nghiêng góc vẫn đọc được kết quả chính xác trên bình chia độ.'
      ],
      guiding_questions: [
        'Làm thế nào để đo được thể tích của một hòn đá cuội có hình dạng gồ ghề bằng một chiếc bình chia độ?',
        'Tại sao trên các thước kẻ học sinh luôn ghi rõ giới hạn đo và độ chia nhỏ nhất?'
      ],
      home_experiments: [
        {
          title: 'Đo thể tích vật gồ ghề bằng bình tràn tự chế',
          materials: ['1 chiếc cốc đầy ắp nước đặt trên đĩa', '1 hòn sỏi nhỏ', '1 xilanh có vạch ml'],
          steps: [
            'Đổ nước vào cốc cho đến khi nước mấp mé miệng cốc.',
            'Thả nhẹ hòn sỏi vào cốc, nước tràn ra đĩa hứng bên dưới.',
            'Dùng xilanh hút toàn bộ lượng nước tràn ra để đọc thể tích chính xác của hòn sỏi.'
          ],
          expected_outcome: 'Thể tích nước tràn ra đĩa bằng đúng thể tích của hòn sỏi thả vào cốc.',
          safety_notes: 'Lau khô mặt bàn sau khi làm thí nghiệm với nước.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Đơn vị đo khối lượng chuẩn trong hệ thống đo lường quốc tế (SI) là gì?',
        options: [
          { id: 'A', text: 'Gam (g)' },
          { id: 'B', text: 'Kilôgam (kg)' },
          { id: 'C', text: 'Tấn (t)' },
          { id: 'D', text: 'Miligam (mg)' }
        ],
        correct_answer: 'B',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Ký hiệu là kg, là đơn vị cơ bản trong hệ đơn vị quốc tế SI.' }
        ],
        explanation: 'Kilôgam (kg) là đơn vị đo khối lượng cơ bản trong hệ đo lường quốc tế SI.'
      }
    ]
  },
  {
    grade: 6,
    tier: 'middle',
    topicTitle: 'Lực tiếp xúc và lực không tiếp xúc',
    slug: 'lop-6-luc-tiep-xuc-khong-tiep-xuc',
    topicDescription: 'Phân loại các lực trong tự nhiên: lực đẩy/kéo tiếp xúc, lực đàn hồi, lực hút hấp dẫn và lực từ.',
    icon: 'Maximize2',
    lessonTitle: 'Thế giới của các loại lực',
    lessonSlug: 'the-gioi-cac-loai-luc',
    contentMarkdown: `# Phân loại lực trong tự nhiên

Lực là tác dụng đẩy hoặc kéo của vật này lên vật khác, làm biến đổi chuyển động hoặc biến dạng vật:
- **Lực tiếp xúc**: Chỉ xuất hiện khi hai vật tiếp xúc chạm vào nhau (ví dụ: chân sút vào bóng, tay kéo lò xo dãn, lực ma sát giữa lốp xe và mặt đường).
- **Lực không tiếp xúc**: Xuất hiện ngay cả khi hai vật ở cách xa nhau một khoảng không gian (ví dụ: lực hút của Trái Đất kéo quả táo rơi, lực từ giữa hai cực nam châm hút hoặc đẩy nhau từ xa).`,
    summary: 'Lực tiếp xúc cần có sự chạm nhau giữa các vật; lực không tiếp xúc tác dụng qua không gian như trọng lực, lực từ.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Giúp học sinh hình thành tư duy phân loại tương tác cơ học và làm quen với khái niệm trường lực (trường hấp dẫn, từ trường).',
      misconceptions: [
        'Học sinh nghĩ rằng để tác dụng lực lên vật thì bắt buộc hai vật phải chạm vào nhau.',
        'Học sinh nghĩ lực đàn hồi của lò xo là lực không tiếp xúc.'
      ],
      guiding_questions: [
        'Khi mẹ đưa thanh nam châm lại gần chiếc ghim sắt mà chưa chạm vào, tại sao chiếc ghim vẫn bị hút bay tới?',
        'Khi con đá quả bóng bay đi, lực tác dụng của chân lên quả bóng là lực tiếp xúc hay không tiếp xúc?'
      ],
      home_experiments: [
        {
          title: 'Chiếc kim ma thuật lơ lửng giữa không trung',
          materials: ['1 chiếc kim khâu sắt', '1 sợi chỉ dài 20cm', '1 thanh nam châm mạnh', 'Băng dính'],
          steps: [
            'Buộc sợi chỉ vào lỗ kim, dán cố định đầu kia sợi chỉ xuống mặt bàn.',
            'Cầm nam châm giữ phía trên mũi kim khoảng 1 cm sao cho kim bị hút dựng đứng lơ lửng.',
            'Kéo nhẹ nam châm lên từ từ để kim không chạm vào nam châm nhưng vẫn đứng thẳng trên không.'
          ],
          expected_outcome: 'Chiếc kim lơ lửng giữa không trung mà không chạm vào nam châm, chứng minh lực từ là lực không tiếp xúc.',
          safety_notes: 'Cẩn thận với mũi kim khâu nhọn tránh đâm vào tay.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Lực nào dưới đây là ví dụ điển hình về LỰC KHÔNG TIẾP XÚC?',
        options: [
          { id: 'A', text: 'Lực của tay đẩy cánh cửa mở ra' },
          { id: 'B', text: 'Lực từ của nam châm hút đinh sắt từ xa' },
          { id: 'C', text: 'Lực của búa gõ đập vào chiếc đinh' },
          { id: 'D', text: 'Lực của ngón tay kéo dãn sợi dây cao su' }
        ],
        correct_answer: 'B',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Hai vật không cần phải chạm trực tiếp vào nhau vẫn có lực tác dụng.' }
        ],
        explanation: 'Lực từ tác dụng qua từ trường trong không gian mà không cần tiếp xúc cơ học.'
      }
    ]
  },
  {
    grade: 6,
    tier: 'middle',
    topicTitle: 'Lực ma sát và lực cản của môi trường',
    slug: 'lop-6-luc-ma-sat-luc-can',
    topicDescription: 'Tìm hiểu ma sát trượt, ma sát nghỉ, lực cản không khí, vai trò có lợi và có hại của ma sát.',
    icon: 'Move',
    lessonTitle: 'Lực ma sát: Bạn hay thù?',
    lessonSlug: 'luc-ma-sat-ban-hay-thu',
    contentMarkdown: `# Lực ma sát trong cuộc sống

Lực ma sát xuất hiện ở bề mặt tiếp xúc giữa hai vật và cản trở chuyển động của chúng:
- **Ma sát trượt**: Xuất hiện khi một vật trượt trên bề mặt vật khác (ví dụ: gôm tẩy trượt trên trang giấy, má phanh ép vào vành xe).
- **Ma sát nghỉ**: Giữ cho vật đứng yên không bị trượt khi bị lực kéo nhẹ (giúp con người bước đi mà không bị ngã trơn trượt).
- **Ma sát có lợi**: Giúp xe cộ phanh dừng lại, giúp tay cầm nắm cốc nước không bị tuột.
- **Ma sát có hại**: Làm mòn lốp xe, nóng ổ trục máy móc (người ta tra dầu mỡ hoặc dùng ổ bi để giảm ma sát).`,
    summary: 'Ma sát cản trở chuyển động nhưng rất cần thiết để con người bước đi và xe cộ di chuyển an toàn.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Giúp học sinh nhìn nhận tính hai mặt của lực ma sát và nguyên lý ứng dụng con lăn, dầu bôi trơn trong kỹ thuật.',
      misconceptions: [
        'Học sinh thường nghĩ ma sát luôn là lực có hại và muốn loại bỏ hoàn toàn ma sát khỏi thế giới.',
        'Học sinh nghĩ bề mặt càng nhẵn bóng hoàn hảo thì ma sát càng lớn.'
      ],
      guiding_questions: [
        'Nếu mặt đường hoàn toàn trơn tuột không hề có lực ma sát, chiếc ô tô có thể lăn bánh khởi hành được không?',
        'Tại sao đế giày thể thao và lốp xe máy luôn được khía nhiều rãnh gai sâu?'
      ],
      home_experiments: [
        {
          title: 'Chiếc hộp kéo nặng và sức mạnh của con lăn',
          materials: ['1 hộp sách nặng', '5 chiếc bút chì tròn', '1 sợi dây chun kéo'],
          steps: [
            'Buộc dây chun vào hộp sách, kéo hộp trượt trực tiếp trên mặt sàn nhà (dây chun dãn dài vì ma sát trượt lớn).',
            'Xếp 5 chiếc bút chì song song dưới đáy hộp làm con lăn rồi kéo lại bằng dây chun.'
          ],
          expected_outcome: 'Dây chun hầu như không bị dãn, hộp sách lăn đi nhẹ nhàng vì ma sát lăn nhỏ hơn ma sát trượt rất nhiều lần.',
          safety_notes: 'Kéo nhẹ nhàng tránh đứt dây chun bắn vào mắt.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Trường hợp nào dưới đây lực ma sát đóng vai trò CÓ HẠI?',
        options: [
          { id: 'A', text: 'Ma sát giữa má phanh và vành bánh xe giúp xe dừng lại' },
          { id: 'B', text: 'Ma sát làm mòn xích đĩa xe đạp và nóng ổ trục sau thời gian sử dụng' },
          { id: 'C', text: 'Ma sát giữa đế giày và mặt đường giúp ta không bị trượt ngã' },
          { id: 'D', text: 'Ma sát giữa đầu que diêm và vỏ bao diêm giúp diêm bốc cháy' }
        ],
        correct_answer: 'B',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Tìm hiện tượng làm hao mòn vật liệu và tiêu tốn năng lượng vô ích.' }
        ],
        explanation: 'Ma sát làm mòn chi tiết cơ khí và sinh nhiệt hao phí là ma sát có hại cần tra dầu mỡ.'
      }
    ]
  },
  {
    grade: 6,
    tier: 'middle',
    topicTitle: 'Năng lượng và sự chuyển hóa năng lượng',
    slug: 'lop-6-chuyen-hoa-nang-luong',
    topicDescription: 'Các dạng năng lượng (cơ năng, nhiệt năng, điện năng, quang năng) và định luật bảo toàn năng lượng.',
    icon: 'Zap',
    lessonTitle: 'Năng lượng không tự nhiên sinh ra',
    lessonSlug: 'dinh-luat-bao-toan-nang-luong',
    contentMarkdown: `# Năng lượng và sự chuyển hóa

Năng lượng là khả năng thực hiện công hoặc truyền nhiệt của một vật:
- Các dạng năng lượng phổ biến: **Cơ năng** (động năng, thế năng), **Nhiệt năng**, **Điện năng**, **Quang năng**, **Hóa năng**.
- Sự chuyển hóa năng lượng:
  - Bàn là điện: Điện năng $\\rightarrow$ Nhiệt năng.
  - Quạt trần: Điện năng $\\rightarrow$ Cơ năng (quay cánh quạt).
  - Đèn pin: Hóa năng trong pin $\\rightarrow$ Điện năng $\\rightarrow$ Quang năng.
- **Định luật bảo toàn năng lượng**: Năng lượng không tự nhiên sinh ra cũng không tự nhiên mất đi, nó chỉ truyền từ vật này sang vật khác hoặc chuyển hóa từ dạng này sang dạng khác.`,
    summary: 'Năng lượng tồn tại dưới nhiều dạng và luôn tuân theo định luật bảo toàn: chỉ biến đổi dạng chứ không mất đi.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Khắc sâu định luật tự nhiên cơ bản nhất của vũ trụ: năng lượng luôn được bảo toàn trong mọi quá trình biến đổi.',
      misconceptions: [
        'Học sinh nghĩ năng lượng khi dùng xong là biến mất vĩnh viễn vào hư vô.',
        'Học sinh nghĩ có thể chế tạo được động cơ vĩnh cửu tự chạy mãi mãi mà không cần cung cấp nhiên liệu.'
      ],
      guiding_questions: [
        'Khi con đi xe đạp leo lên đỉnh dốc rồi thả trôi xuống dốc, năng lượng đã chuyển hóa giữa những dạng nào?',
        'Nhiên liệu xăng đổ vào xe máy đã biến thành những dạng năng lượng nào khi xe chạy trên đường?'
      ],
      home_experiments: [
        {
          title: 'Chiếc xích đu chuyển hóa thế năng và động năng',
          materials: ['1 sợi chỉ dài 50 cm', '1 quả cầu nhỏ bằng đất nặn', '1 thanh giá đỡ'],
          steps: [
            'Treo quả cầu vào sợi chỉ làm con lắc.',
            'Kéo quả cầu lên cao (tích lũy thế năng) rồi buông tay nhẹ nhàng.',
            'Quan sát khi đi qua vị trí thấp nhất (vận tốc lớn nhất, động năng cực đại).'
          ],
          expected_outcome: 'Thế năng chuyển hóa thành động năng khi hạ thấp, và động năng chuyển ngược thành thế năng khi bay lên cao.',
          safety_notes: 'Thả con lắc nhẹ nhàng không làm đổ giá đỡ.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Khi chiếc quạt điện hoạt động bình thường, điện năng chủ yếu được chuyển hóa thành dạng năng lượng nào?',
        options: [
          { id: 'A', text: 'Quang năng chiếu sáng' },
          { id: 'B', text: 'Cơ năng làm quay cánh quạt' },
          { id: 'C', text: 'Hóa năng tích trữ' },
          { id: 'D', text: 'Hạt nhân nguyên tử' }
        ],
        correct_answer: 'B',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Cánh quạt quay tạo ra luồng gió là chuyển động cơ học.' }
        ],
        explanation: 'Quạt điện biến đổi điện năng thành cơ năng làm quay cánh quạt.'
      }
    ]
  },

  // ==========================================
  // GRADE 7 (Middle - 4 topics)
  // ==========================================
  {
    grade: 7,
    tier: 'middle',
    topicTitle: 'Đo tốc độ và đồ thị quãng đường - thời gian',
    slug: 'lop-7-do-toc-do-do-thi',
    topicDescription: 'Công thức tốc độ v = s/t, vẽ và phân tích đồ thị quãng đường s theo thời gian t.',
    icon: 'LineChart',
    lessonTitle: 'Tốc độ và Đồ thị chuyển động',
    lessonSlug: 'toc-do-va-do-thi',
    contentMarkdown: `# Khái niệm tốc độ và đồ thị

Tốc độ là đại lượng đặc trưng cho mức độ nhanh hay chậm của chuyển động:
- Công thức tính tốc độ:
$$v = \\frac{s}{t}$$
Trong đó:
- $s$ là quãng đường đi được (đơn vị: $m$ hoặc $km$).
- $t$ là thời gian đi hết quãng đường đó (đơn vị: $s$ hoặc $h$).
- $v$ là tốc độ chuyển động (đơn vị: $m/s$ hoặc $km/h$). Đổi đơn vị: $1\\text{ m/s} = 3.6\\text{ km/h}$.

Đồ thị quãng đường - thời gian biểu diễn sự phụ thuộc của $s$ theo $t$. Đường đồ thị dốc càng cao thì vật chuyển động càng nhanh; đường nằm ngang ứng với vật đang đứng yên.`,
    summary: 'Tốc độ v = s/t biểu thị mức độ nhanh chậm. Đồ thị s-t giúp phân tích trạng thái chuyển động trực quan.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Dạy học sinh kỹ năng tính toán tốc độ chuyển động thực tế và đọc hiểu đồ thị tọa độ trong đời sống giao thông.',
      misconceptions: [
        'Học sinh thường quên đổi đồng nhất đơn vị giữa km/h và m/s dẫn đến tính sai kết quả.',
        'Nhầm lẫn đồ thị s-t nằm ngang là vật đi với tốc độ không đổi (thực tế s không đổi nghĩa là vật đang dừng lại).'
      ],
      guiding_questions: [
        'Nếu một người đi xe máy từ Hà Nội về Phủ Lý quãng đường $60\\text{ km}$ hết $1.5\\text{ giờ}$, tốc độ trung bình là bao nhiêu km/h?',
        'Trên đồ thị quãng đường - thời gian, đoạn thẳng nằm ngang song song trục thời gian có ý nghĩa gì?'
      ],
      home_experiments: [
        {
          title: 'Đo tốc độ lăn của quả bóng trên sàn',
          materials: ['1 quả bóng bàn', '1 thước dây cuộn', 'Đồng hồ bấm giây điện thoại'],
          steps: [
            'Dùng thước dây đánh dấu quãng đường $s = 2\\text{ m}$ trên sàn nhà.',
            'Đẩy nhẹ quả bóng lăn qua vạch xuất phát và bấm đồng hồ, dừng bấm khi bóng qua vạch đích.',
            'Áp dụng công thức $v = \\frac{s}{t}$ để tính tốc độ chuyển động của quả bóng.'
          ],
          expected_outcome: 'Học sinh đo được thời gian thực tế và tính được tốc độ chuyển động chính xác theo đơn vị m/s.',
          safety_notes: 'Thực hiện trên sàn nhà bằng phẳng không có chướng ngại vật.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một vận động viên bơi lội bơi được quãng đường $s = 100\\text{ m}$ trong thời gian $t = 50\\text{ s}$. Tốc độ bơi trung bình của vận động viên này là bao nhiêu m/s?',
        latex_formula: 'v = \\frac{s}{t}',
        correct_answer: '2',
        numeric_tolerance: 0.02,
        numeric_unit: 'm/s',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Áp dụng công thức tốc độ: $v = \\frac{s}{t}$ với $s = 100\\text{ m}$ và $t = 50\\text{ s}$.' }
        ],
        explanation: 'Áp dụng công thức $v = \\frac{s}{t} = \\frac{100}{50} = 2\\text{ m/s}$.'
      }
    ]
  },
  {
    grade: 7,
    tier: 'middle',
    topicTitle: 'Độ to, độ cao của âm thanh và phản xạ âm',
    slug: 'lop-7-song-am-tieng-vang',
    topicDescription: 'Tần số dao động quyết định độ cao (bổng/trầm), biên độ quyết định độ to (dB), tiếng vang và ô nhiễm tiếng ồn.',
    icon: 'VolumeX',
    lessonTitle: 'Đặc tính của sóng âm',
    lessonSlug: 'dac-tinh-song-am',
    contentMarkdown: `# Tần số, biên độ và tiếng vang

Sóng âm có hai đặc trưng sinh lý gắn liền với đại lượng vật lý:
- **Độ cao của âm**: Do **tần số dao động** ($f$, đơn vị Héc - $Hz$) quyết định.
  - Tần số càng lớn $\\rightarrow$ dao động càng nhanh $\\rightarrow$ âm phát ra càng **cao (bổng)**.
  - Tần số càng nhỏ $\\rightarrow$ dao động càng chậm $\\rightarrow$ âm phát ra càng **thấp (trầm)**.
- **Độ to của âm**: Do **biên độ dao động** quyết định. Biên độ càng lớn, âm nghe càng to (đo bằng đề-xi-ben, $dB$).
- **Phản xạ âm & Tiếng vang**: Khi sóng âm gặp mặt chắn (vách đá, bức tường lớn) bị dội ngược trở lại. Ta nghe thấy tiếng vang khi âm phản xạ đến tai cách âm trực tiếp ít nhất $\\frac{1}{15}$ giây.`,
    summary: 'Tần số quyết định âm trầm hay bổng. Biên độ quyết định âm to hay nhỏ. Âm dội lại từ mặt chắn tạo ra tiếng vang.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Giúp học sinh phân biệt rạch ròi giữa độ to và độ bổng của âm thanh, nhận biết tác hại của ô nhiễm tiếng ồn đô thị.',
      misconceptions: [
        'Học sinh hay nhầm lẫn giữa âm to (biên độ lớn) với âm cao/bổng (tần số lớn).',
        'Nghĩ rằng trong phòng nhỏ không có âm phản xạ (thực tế có phản xạ nhưng đến quá nhanh nên tai không phân biệt được thành tiếng vang).'
      ],
      guiding_questions: [
        'Giọng hát của ca sĩ nữ sonprano cao vút khác với giọng nam trầm ấm về tần số dao động như thế nào?',
        'Tại sao khi đứng hét to trong hang đá lớn con lại nghe thấy tiếng của mình vọng lại sau một tích tắc?'
      ],
      home_experiments: [
        {
          title: 'Chiếc thước kẻ biến đổi tần số âm thanh',
          materials: ['1 chiếc thước nhựa dẻo dài 30 cm', 'Mặt bàn học phẳng'],
          steps: [
            'Đặt thước nhô ra khỏi mép bàn 20 cm, lấy tay ấn chặt phần thước trên bàn.',
            'Dùng tay kia gảy mạnh đầu tự do và lắng nghe âm phát ra (âm trầm, thước rung chậm).',
            'Rút ngắn phần nhô ra còn 8 cm và gảy lại.'
          ],
          expected_outcome: 'Khi phần nhô ra ngắn lại, thước rung nhanh hơn (tần số cao hơn) và phát ra âm thanh cao vút hơn hẳn.',
          safety_notes: 'Ấn giữ thước chắc tay tránh thước văng trúng mặt.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Đại lượng vật lý nào quyết định độ CAO (bổng hay trầm) của âm thanh phát ra?',
        options: [
          { id: 'A', text: 'Tần số dao động của nguồn âm' },
          { id: 'B', text: 'Biên độ dao động của nguồn âm' },
          { id: 'C', text: 'Vận tốc gió trong phòng' },
          { id: 'D', text: 'Khoảng cách từ nguồn âm đến tai' }
        ],
        correct_answer: 'A',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Số dao động thực hiện được trong một giây (đo bằng Hz).' }
        ],
        explanation: 'Tần số dao động quyết định độ cao (âm trầm hay âm bổng) của âm thanh.'
      }
    ]
  },
  {
    grade: 7,
    tier: 'middle',
    topicTitle: 'Sự truyền ánh sáng, tia sáng và vùng tối',
    slug: 'lop-7-tia-sang-vung-toi',
    topicDescription: 'Định luật truyền thẳng của ánh sáng, mô hình tia sáng, chùm sáng, giải thích hiện tượng nhật thực và nguyệt thực.',
    icon: 'Eye',
    lessonTitle: 'Định luật truyền thẳng của ánh sáng',
    lessonSlug: 'dinh-luat-truyen-thang',
    contentMarkdown: `# Ánh sáng truyền theo đường nào?

Trong môi trường trong suốt và đồng tính (như không khí trong lành, nước tinh khiết), **ánh sáng truyền đi theo đường thẳng**:
- **Tia sáng**: Biểu diễn bằng một đường thẳng có mũi tên chỉ hướng truyền của ánh sáng.
- **Chùm sáng**: Tập hợp của nhiều tia sáng (chùm song song, chùm hội tụ, chùm phân kỳ).
- **Vùng tối và vùng nửa tối**: Phía sau vật cản có vùng tối hoàn toàn (không nhận được ánh sáng từ nguồn) và vùng nửa tối (chỉ nhận được một phần ánh sáng).
- **Nhật thực**: Xảy ra khi Mặt Trăng nằm giữa Mặt Trời và Trái Đất, bóng của Mặt Trăng che khuất Mặt Trời.
- **Nguyệt thực**: Xảy ra khi Trái Đất nằm giữa Mặt Trời và Mặt Trăng, bóng của Trái Đất che khuất Mặt Trăng.`,
    summary: 'Ánh sáng truyền thẳng trong môi trường trong suốt đồng tính. Bóng tối giải thích hiện tượng nhật thực và nguyệt thực.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Giải thích hiện tượng thiên văn kỳ thú nhật thực và nguyệt thực dựa trên định luật truyền thẳng của ánh sáng.',
      misconceptions: [
        'Học sinh thường nhầm lẫn vị trí của Mặt Trăng và Trái Đất trong nhật thực và nguyệt thực.',
        'Nghĩ rằng ánh sáng có thể tự uốn cong qua góc tường mà không cần gương phản xạ.'
      ],
      guiding_questions: [
        'Vào ban ngày khi Mặt Trăng che khuất Mặt Trời làm trời tối sầm lại giữa trưa, hiện tượng đó gọi là gì?',
        'Tại sao người thợ mộc thường nheo một mắt ngắm dọc theo mép thanh gỗ để xem thanh gỗ có thẳng hay không?'
      ],
      home_experiments: [
        {
          title: 'Kiểm chứng đường truyền thẳng của ánh sáng qua 3 tấm bìa',
          materials: ['3 tấm bìa cứng có đục 1 lỗ nhỏ ở chính giữa', '1 ngọn nến hoặc đèn pin'],
          steps: [
            'Đặt ngọn nến thắp sáng ở đầu bàn.',
            'Xếp 3 tấm bìa sao cho 3 lỗ thủng thẳng hàng với ngọn nến.',
            'Đặt mắt nhìn qua lỗ ở tấm bìa thứ ba để thấy ngọn nến, sau đó dịch nhẹ tấm bìa ở giữa lệch sang một bên.'
          ],
          expected_outcome: 'Khi 3 lỗ thẳng hàng thì nhìn thấy nến. Khi xê dịch tấm bìa giữa làm lệch đường thẳng, ánh sáng bị chặn lại ngay lập tức.',
          safety_notes: 'Thao tác cẩn thận với ngọn nến đang cháy.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Hiện tượng Nhật thực xảy ra khi vị trí của 3 thiên thể sắp xếp như thế nào theo đường thẳng?',
        options: [
          { id: 'A', text: 'Trái Đất nằm ở giữa Mặt Trời và Mặt Trăng' },
          { id: 'B', text: 'Mặt Trăng nằm ở giữa Mặt Trời và Trái Đất' },
          { id: 'C', text: 'Mặt Trời nằm ở giữa Trái Đất và Mặt Trăng' },
          { id: 'D', text: 'Mặt Trăng biến mất hoàn toàn khỏi quỹ đạo' }
        ],
        correct_answer: 'B',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Mặt Trăng che khuất ánh sáng từ Mặt Trời chiếu xuống bề mặt Trái Đất.' }
        ],
        explanation: 'Nhật thực xảy ra khi Mặt Trăng nằm giữa Mặt Trời và Trái Đất, đổ bóng tối lên Trái Đất.'
      }
    ]
  },
  {
    grade: 7,
    tier: 'middle',
    topicTitle: 'Sự phản xạ ánh sáng & Định luật phản xạ',
    slug: 'lop-7-dinh-luat-phan-xa-anh-sang',
    topicDescription: 'Hiện tượng phản xạ ánh sáng, tia tới, tia phản xạ, pháp tuyến và định luật góc phản xạ bằng góc tới (i\' = i).',
    icon: 'Sparkle',
    lessonTitle: 'Định luật phản xạ ánh sáng',
    lessonSlug: 'dinh-luat-phan-xa',
    contentMarkdown: `# Ánh sáng bật ngược trở lại

Khi tia sáng chiếu vào bề mặt nhẵn bóng (như gương phẳng, mặt nước lặng), tia sáng bị hắt ngược trở lại môi trường cũ gọi là **sự phản xạ ánh sáng**:
- **Định luật phản xạ ánh sáng**:
  1. Tia phản xạ nằm trong mặt phẳng tới (mặt phẳng chứa tia tới và pháp tuyến của gương tại điểm tới).
  2. Góc phản xạ ($i'$) luôn bằng góc tới ($i$):
$$i' = i$$
- **Tính chất ảnh qua gương phẳng**:
  - Là ảnh ảo, không hứng được trên màn chắn.
  - Độ lớn của ảnh bằng đúng độ lớn của vật ($A'B' = AB$).
  - Khoảng cách từ ảnh đến gương bằng khoảng cách từ vật đến gương ($d' = d$).`,
    summary: 'Định luật phản xạ ánh sáng: Tia phản xạ nằm trong mặt phẳng tới, góc phản xạ bằng góc tới (i\' = i).',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Giúp học sinh vẽ đường đi của tia sáng phản xạ qua gương và hiểu tính chất đối xứng của ảnh tạo bởi gương phẳng.',
      misconceptions: [
        'Học sinh thường đo góc tới và góc phản xạ so với mặt gương thay vì so với đường pháp tuyến vuông góc.',
        'Nghĩ rằng ảnh trong gương phẳng nhỏ hơn khi mình lùi ra xa gương.'
      ],
      guiding_questions: [
        'Nếu một tia sáng chiếu vuông góc vào mặt gương phẳng (góc tới $i = 0^\\circ$), tia phản xạ sẽ đi theo hướng nào?',
        'Khi con đứng cách gương phẳng $1.5\\text{ m}$, ảnh của con trong gương cách con một khoảng bao nhiêu mét?'
      ],
      home_experiments: [
        {
          title: 'Khám phá ảnh đối xứng qua gương phẳng',
          materials: ['1 chiếc gương soi nhỏ phẳng', '1 tờ giấy có viết chữ "VẬT LÝ" bằng bút dạ đậm'],
          steps: [
            'Đặt tờ giấy trước gương phẳng và nhìn ảnh của dòng chữ trong gương.',
            'Nhận xét hướng quay của chữ cái và tính chất đối xứng trái - phải của ảnh.'
          ],
          expected_outcome: 'Dòng chữ trong gương bị đảo ngược chiều trái - phải theo nguyên tắc đối xứng của gương phẳng.',
          safety_notes: 'Cầm gương cẩn thận tránh làm rơi vỡ cạnh kính sắc.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một tia sáng chiếu tới mặt gương phẳng với góc tới $i = 35^\\circ$ so với pháp tuyến. Góc phản xạ $i\'$ có độ lớn bằng bao nhiêu độ?',
        latex_formula: "i' = i",
        correct_answer: '35',
        numeric_tolerance: 0.02,
        numeric_unit: 'độ',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Theo định luật phản xạ ánh sáng: góc phản xạ luôn bằng góc tới ($i\' = i$).' }
        ],
        explanation: 'Theo định luật phản xạ ánh sáng, góc phản xạ $i\' = i = 35^\\circ$.'
      }
    ]
  }
];

console.log(`Generated ${topicsPart2.length} topics for grades 6 & 7.`);

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
for (const t of topicsPart2) {
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
console.log('Verified KaTeX in grades 6 & 7 successfully.');

// Export to json temp
fs.writeFileSync(path.resolve(__dirname, 'temp_grades_6_7.json'), JSON.stringify(topicsPart2, null, 2), 'utf-8');
