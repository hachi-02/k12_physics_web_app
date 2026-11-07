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
  // --------------------------------------------------------------------------
  // GRADE 1
  // --------------------------------------------------------------------------
  {
    grade: 1,
    tier: 'primary',
    topicTitle: 'Ánh sáng quanh em & Sự tạo bóng',
    slug: 'lop-1-anh-sang-quanh-em',
    topicDescription: 'Khám phá nguồn sáng tự nhiên, nguồn sáng nhân tạo và cách bóng của đồ vật xuất hiện.',
    icon: 'Sun',
    lessonTitle: 'Bóng của đồ vật thay đổi như thế nào?',
    lessonSlug: 'bong-cua-do-vat',
    contentMarkdown: `# Khám phá bóng của đồ vật

Ánh sáng truyền thẳng từ nguồn sáng như Mặt Trời, bóng đèn hay đèn pin.

Khi ánh sáng chiếu tới một đồ vật không trong suốt (như bàn tay, quyển sách hay cái ghế), đồ vật sẽ chắn đường đi của ánh sáng. Vùng không gian tối ở phía sau đồ vật được gọi là **bóng của đồ vật**.

Khi nguồn sáng thay đổi vị trí:
- Đưa đèn pin lại gần bàn tay, bóng trên tường sẽ **to hơn**.
- Đưa đèn pin ra xa bàn tay, bóng trên tường sẽ **nhỏ lại**.
- Đi ngoài nắng giữa trưa, bóng của em in ngay dưới chân; còn buổi chiều tà, bóng của em kéo rất dài trên mặt đất!`,
    summary: 'Ánh sáng truyền thẳng. Khi bị vật cản che khuất, phía sau vật xuất hiện bóng tối.',
    durationMinutes: 15,
    parentGuide: {
      summary: 'Ánh sáng truyền thẳng từ nguồn sáng. Khi gặp một vật cản không cho ánh sáng đi qua, phía sau vật sẽ xuất hiện vùng tối gọi là bóng của vật.',
      misconceptions: [
        'Trẻ thường nghĩ bóng là một vật thể sống riêng biệt đi theo người.',
        'Trẻ nghĩ trong căn phòng tối đen như mực vẫn có thể nhìn thấy bóng của mình.'
      ],
      guiding_questions: [
        'Đố con vì sao lúc giữa trưa đi ngoài nắng bóng của con lại ngắn, còn lúc chiều tà bóng lại dài ra?',
        'Nếu mẹ tắt hết đèn trong phòng tối om, con có nhìn thấy bóng của tay mình không? Vì sao?'
      ],
      home_experiments: [
        {
          title: 'Rạp xiếc bóng trên tường',
          materials: ['1 chiếc đèn pin hoặc đèn flash điện thoại', 'Bức tường trắng', 'Bàn tay hoặc đồ chơi nhỏ'],
          steps: [
            'Tắt đèn phòng, bật đèn pin chiếu vào tường.',
            'Đặt bàn tay vào giữa đèn pin và tường, uốn ngón tay tạo hình chú thỏ.',
            'Di chuyển đèn pin lại gần rồi ra xa tay để quan sát kích thước chú thỏ thay đổi.'
          ],
          expected_outcome: 'Khi đưa đèn pin lại gần bàn tay, bóng trên tường to lên. Khi đưa đèn pin ra xa, bóng nhỏ lại.',
          safety_notes: 'Không chiếu trực tiếp đèn pin công suất lớn vào mắt trẻ.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Hiện tượng nào sau đây tạo ra bóng của một đồ vật?',
        options: [
          { id: 'A', text: 'Ánh sáng đi xuyên qua tấm kính trong suốt' },
          { id: 'B', text: 'Vật cản ánh sáng từ đèn chiếu tới tạo vùng tối phía sau' },
          { id: 'C', text: 'Đặt đồ vật trong căn phòng tối om không có đèn' },
          { id: 'D', text: 'Đồ vật tự phát ra ánh sáng màu đen' }
        ],
        correct_answer: 'B',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Con hãy nhớ lại lúc chơi rạp xiếc bóng trên tường, bàn tay con đã làm gì với tia sáng từ đèn pin?' }
        ],
        explanation: 'Khi một vật chắn đường truyền của ánh sáng, vùng không nhận được ánh sáng phía sau vật sẽ tạo thành bóng của vật.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // GRADE 2
  // --------------------------------------------------------------------------
  {
    grade: 2,
    tier: 'primary',
    topicTitle: 'Âm thanh trong đời sống & Rung động',
    slug: 'lop-2-am-thanh-va-rung-dong',
    topicDescription: 'Tìm hiểu nguồn gốc của âm thanh từ sự rung động của các vật thể xung quanh.',
    icon: 'Volume2',
    lessonTitle: 'Âm thanh bắt nguồn từ đâu?',
    lessonSlug: 'am-thanh-bat-nguon-tu-dau',
    contentMarkdown: `# Thế giới âm thanh kỳ diệu

Hàng ngày chúng ta nghe thấy tiếng chim hót, tiếng còi xe, tiếng chuông đồng hồ hay giọng nói của cha mẹ.

Mọi âm thanh phát ra trong tự nhiên đều bắt nguồn từ **sự rung động** (dao động) qua lại rất nhanh của các vật thể:
- Khi gảy đàn ghita, sợi dây đàn rung rinh phát ra tiếng nhạc.
- Khi gõ trống, mặt trống rung lên làm rung các hạt bụi nhỏ phía trên.
- Khi em nói chuyện, hai dây thanh âm trong cổ họng của em đang rung động.

Nếu ta dùng tay chặn đứng sự rung động đó lại, âm thanh sẽ lập tức tắt ngấm!`,
    summary: 'Mọi âm thanh đều do các vật rung động phát ra. Khi vật ngừng rung, âm thanh cũng tắt.',
    durationMinutes: 15,
    parentGuide: {
      summary: 'Mọi âm thanh phát ra trong tự nhiên đều bắt nguồn từ sự rung động (dao động) của các vật thể. Khi vật ngừng rung, âm thanh cũng tắt.',
      misconceptions: [
        'Trẻ nghĩ âm thanh tự nhiên xuất hiện trong không khí mà không cần vật nào rung.',
        'Trẻ nghĩ âm thanh có thể truyền qua chân không mà không cần môi trường.'
      ],
      guiding_questions: [
        'Khi con nói to hoặc hát, con đặt nhẹ tay lên cổ họng xem có cảm giác gì rung rung không?',
        'Tại sao khi lấy tay giữ chặt mặt trống đang kêu thì tiếng trống ngừng hẳn?'
      ],
      home_experiments: [
        {
          title: 'Hạt gạo nhảy múa theo tiếng nhạc',
          materials: ['1 chiếc bát sứ lớn', 'Màng bọc thực phẩm', '15 hạt gạo sống', '1 chiếc xoong nhôm và 1 chiếc thìa'],
          steps: [
            'Bọc thật căng màng bọc thực phẩm lên miệng bát sứ.',
            'Rắc 10-15 hạt gạo sống lên trên màng bọc.',
            'Cầm thìa gõ mạnh vào đáy xoong đặt cạnh bát (không chạm vào bát) và quan sát.'
          ],
          expected_outcome: 'Hạt gạo nảy lên múa lượn vì sóng âm từ xoong truyền qua không khí làm màng bọc rung lên.',
          safety_notes: 'Gõ xoong vừa phải để tránh làm chói tai trẻ nhỏ.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Khi gảy một sợi dây đàn ghi-ta, ta nghe thấy tiếng đàn vang lên vì lý do gì?',
        options: [
          { id: 'A', text: 'Sợi dây đàn bị nóng lên' },
          { id: 'B', text: 'Sợi dây đàn rung động qua lại rất nhanh' },
          { id: 'C', text: 'Sợi dây đàn bị kéo dãn dài ra vĩnh viễn' },
          { id: 'D', text: 'Sợi dây đàn đổi màu sắc' }
        ],
        correct_answer: 'B',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Hãy quan sát thật kỹ sợi dây đàn ngay lúc vừa gảy xong, sợi dây đang đứng yên hay chuyển động thế nào?' }
        ],
        explanation: 'Sợi dây đàn rung động làm dao động các phân tử không khí xung quanh, truyền đến tai ta tạo thành âm thanh.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // GRADE 3
  // --------------------------------------------------------------------------
  {
    grade: 3,
    tier: 'primary',
    topicTitle: 'Nam châm kỳ diệu & Lực từ',
    slug: 'lop-3-nam-cham-va-luc-tu',
    topicDescription: 'Khám phá các cực của nam châm, tương tác hút - đẩy và các vật liệu có từ tính.',
    icon: 'Magnet',
    lessonTitle: 'Hai cực của nam châm: Hút hay đẩy?',
    lessonSlug: 'hai-cuc-cua-nam-cham',
    contentMarkdown: `# Bí mật của thanh nam châm

Mỗi thanh nam châm luôn có hai cực từ:
- **Cực Bắc** (North - ký hiệu chữ **N**, thường sơn màu đỏ).
- **Cực Nam** (South - ký hiệu chữ **S**, thường sơn màu xanh hoặc trắng).

Quy tắc tương tác giữa hai nam châm:
- Hai cực **cùng tên** đưa lại gần nhau thì **đẩy nhau** ($N - N$ hoặc $S - S$).
- Hai cực **khác tên** đưa lại gần nhau thì **hút chặt lấy nhau** ($N - S$).

Nam châm hút được các kim loại có từ tính như sắt, thép, niken; nhưng **không hút** được nhôm (lon nước ngọt), đồng, vàng hay cao su.`,
    summary: 'Nam châm có hai cực N và S. Cực cùng tên đẩy nhau, khác tên hút nhau. Nam châm hút sắt, thép.',
    durationMinutes: 15,
    parentGuide: {
      summary: 'Nam châm có hai cực từ: Bắc (N) và Nam (S). Cùng dấu thì đẩy nhau, khác dấu thì hút nhau. Nam châm hút được sắt, thép nhưng không hút được nhôm hay đồng.',
      misconceptions: [
        'Nhiều học sinh tin rằng nam châm hút được tất cả các kim loại (kể cả lon nhôm và thìa inox).',
        'Nghĩ rằng nếu bẻ đôi thanh nam châm thì một nửa chỉ có cực Bắc và một nửa chỉ có cực Nam.'
      ],
      guiding_questions: [
        'Con thử đoán xem thanh nam châm trên cánh tủ lạnh có hút được vỏ lon nước ngọt bằng nhôm không?',
        'Nếu mẹ đưa hai đầu màu đỏ của hai thanh nam châm lại gần nhau, chúng sẽ dính chặt hay đẩy nhau ra xa?'
      ],
      home_experiments: [
        {
          title: 'Thám tử nam châm phân loại vật liệu',
          materials: ['1 thanh nam châm nhỏ (từ cánh tủ lạnh hoặc đồ chơi)', 'Kẹp giấy sắt', 'Vỏ lon nước ngọt nhôm', 'Thìa inox', 'Đồng xu', 'Tẩy cao su'],
          steps: [
            'Đặt tất cả các đồ vật lên bàn.',
            'Dùng nam châm rà sát vào từng đồ vật xem vật nào bị dính chặt.',
            'Lập hai nhóm: Đồ vật có từ tính (sắt, thép) và đồ vật không từ tính.'
          ],
          expected_outcome: 'Nam châm chỉ hút kẹp giấy bằng sắt; không hút vỏ lon nhôm hay tẩy cao su.',
          safety_notes: 'Để nam châm xa các thiết bị điện tử nhạy cảm, thẻ từ ngân hàng.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Khi đưa cực Bắc ($N$) của một thanh nam châm lại gần cực Bắc ($N$) của một thanh nam châm khác, hiện tượng gì sẽ xảy ra?',
        options: [
          { id: 'A', text: 'Hai cực hút chặt lấy nhau' },
          { id: 'B', text: 'Hai cực đẩy nhau ra xa' },
          { id: 'C', text: 'Không có hiện tượng gì xảy ra' },
          { id: 'D', text: 'Nam châm lập tức mất hết từ tính' }
        ],
        correct_answer: 'B',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Quy tắc hai cực từ: Cùng dấu thì đẩy nhau, khác dấu thì hút nhau!' }
        ],
        explanation: 'Hai cực cùng tên ($N-N$ hoặc $S-S$) đẩy nhau, hai cực khác tên ($N-S$) hút nhau.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // GRADE 4
  // --------------------------------------------------------------------------
  {
    grade: 4,
    tier: 'primary',
    topicTitle: 'Đường truyền ánh sáng & Gương phẳng',
    slug: 'lop-4-duong-truyen-anh-sang',
    topicDescription: 'Định luật truyền thẳng của ánh sáng, phản xạ ánh sáng và ứng dụng gương phẳng.',
    icon: 'Zap',
    lessonTitle: 'Ánh sáng truyền đi như thế nào?',
    lessonSlug: 'anh-sang-truyen-di-nhu-the-nao',
    contentMarkdown: `# Đường truyền của tia sáng

Trong môi trường trong suốt và đồng tính (như không khí sạch, nước trong hay khối thủy tinh), **ánh sáng truyền đi theo đường thẳng**.

Tia sáng được biểu diễn bằng một đoạn thẳng có mũi tên chỉ chiều truyền của ánh sáng: $\\longrightarrow$.

Điều kiện để mắt ta nhìn thấy một vật:
- Phải có ánh sáng từ vật đó phát ra hoặc phản xạ truyền thẳng vào mắt ta.
- Nếu có một vật cản chắn giữa vật và mắt, ta sẽ không nhìn thấy vật đó nữa.

Khi ánh sáng gặp bề mặt nhẵn bóng như gương phẳng, tia sáng bị hắt trở lại môi trường cũ gọi là **hiện tượng phản xạ ánh sáng**. Ảnh tạo bởi gương phẳng là ảnh ảo có kích thước bằng đúng vật.`,
    summary: 'Ánh sáng truyền thẳng trong môi trường trong suốt, đồng tính. Ta thấy vật khi có ánh sáng từ vật truyền vào mắt.',
    durationMinutes: 15,
    parentGuide: {
      summary: 'Ánh sáng luôn truyền theo đường thẳng trong môi trường trong suốt và đồng tính. Gương phẳng phản xạ ánh sáng và tạo ra ảnh ảo cùng kích thước với vật.',
      misconceptions: [
        'Mắt người có khả năng tự phát ra tia nhìn chiếu tới đồ vật để nhìn thấy vật.',
        'Ánh sáng có thể tự uốn cong qua góc tường mà không cần gương phản xạ.'
      ],
      guiding_questions: [
        'Tại sao người thợ xây hay dùng dây rọi hoặc tia laser để căn thẳng hàng?',
        'Khi con đứng trước gương phẳng và giơ tay phải lên, ảnh trong gương sẽ giơ tay nào?'
      ],
      home_experiments: [
        {
          title: 'Kiểm chứng đường truyền thẳng qua 3 lỗ bìa',
          materials: ['3 tấm bìa cứng đục lỗ kim ở cùng độ cao', 'Đất nặn làm đế giữ bìa', '1 đèn pin nhỏ'],
          steps: [
            'Cắm 3 tấm bìa đứng thẳng hàng trên bàn.',
            'Đặt đèn pin sau tấm bìa thứ nhất.',
            'Ngắm qua lỗ của tấm bìa thứ ba xem có thấy ánh đèn không. Xê dịch tấm bìa ở giữa 2cm.'
          ],
          expected_outcome: 'Chỉ khi 3 lỗ thẳng hàng ta mới thấy ánh đèn. Dịch tấm giữa làm mất tia sáng ngay lập tức.',
          safety_notes: 'Sử dụng kéo đục lỗ cẩn thận.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Mắt ta nhìn thấy một bông hoa hồng màu đỏ nở trong vườn vì lý do gì?',
        options: [
          { id: 'A', text: 'Mắt tự phát ra tia sáng chiếu đến bông hoa' },
          { id: 'B', text: 'Có ánh sáng từ bông hoa truyền thẳng vào mắt ta' },
          { id: 'C', text: 'Bông hoa hút hết ánh sáng trong vườn' },
          { id: 'D', text: 'Không khí xung quanh tự phát ra ánh sáng đỏ' }
        ],
        correct_answer: 'B',
        difficulty: 'medium',
        points: 10,
        hints: [
          { level: 1, hint: 'Điều kiện để mắt ta nhìn thấy một vật là gì?' },
          { level: 2, hint: 'Vật đó phải phát ra ánh sáng hoặc hắt lại ánh sáng vào mắt ta.' }
        ],
        explanation: 'Ta chỉ nhìn thấy một vật khi có ánh sáng từ vật đó phát ra hoặc phản xạ truyền vào mắt ta.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // GRADE 5
  // --------------------------------------------------------------------------
  {
    grade: 5,
    tier: 'primary',
    topicTitle: 'Sự chìm - nổi & Lực đẩy của nước',
    slug: 'lop-5-su-chim-noi-luc-day',
    topicDescription: 'Nguyên nhân vật chìm hoặc nổi trong chất lỏng, lực nâng của nước và ứng dụng làm thuyền.',
    icon: 'Droplet',
    lessonTitle: 'Tại sao hòn đá chìm mà con tàu bằng sắt khổng lồ lại nổi?',
    lessonSlug: 'tai-sao-hon-da-chim-tau-sat-noi',
    contentMarkdown: `# Khám phá lực nâng của chất lỏng

Khi thả một vật vào trong nước, nước tác dụng lên vật một lực đẩy hướng thẳng đứng từ dưới lên trên.

Một vật sẽ chìm hay nổi phụ thuộc vào sự so sánh giữa:
- **Trọng lượng của vật** (hướng xuống).
- **Lực đẩy của nước** tác dụng lên vật (hướng lên).

Tại sao con tàu sắt khổng lồ lại nổi?
- Một cục đất nặn đặc vo tròn thả vào nước sẽ chìm vì thể tích nước nó chiếm chỗ nhỏ $\\implies$ lực nâng nhỏ hơn trọng lượng.
- Khi ta nắn mỏng cục đất nặn thành chiếc thuyền lòng sâu có thành cao, nó chiếm chỗ một thể tích nước rất lớn $\\implies$ sinh ra lực đẩy hướng lên lớn hơn trọng lượng của thuyền, giúp thuyền nổi bồng bềnh!`,
    summary: 'Nước tác dụng lực đẩy hướng lên trên các vật chìm trong nó. Khi lực nâng lớn hơn hoặc bằng trọng lượng, vật sẽ nổi.',
    durationMinutes: 15,
    parentGuide: {
      summary: 'Nước tác dụng một lực đẩy hướng lên trên các vật thả vào trong nó. Một vật sẽ nổi nếu lực đẩy của nước lớn hơn hoặc bằng trọng lượng của nó.',
      misconceptions: [
        'Cứ vật to hoặc nặng là sẽ chìm, vật nhỏ hoặc nhẹ là sẽ nổi.',
        'Sắt đặc thì chìm nên bất kỳ đồ vật nào làm bằng sắt cũng đều phải chìm.'
      ],
      guiding_questions: [
        'Nếu một cục đất nặn đặc vo tròn bị chìm, con có cách nào biến nó thành vật nổi mà không thêm bớt đất nặn không?',
        'Tại sao quả trứng tươi chìm trong nước lã nhưng lại nổi bồng bềnh trong cốc nước muối đặc?'
      ],
      home_experiments: [
        {
          title: 'Biến đất nặn chìm thành thuyền nổi',
          materials: ['1 thỏi đất nặn học sinh', '1 chậu nước hoặc bát tô lớn'],
          steps: [
            'Vo tròn thỏi đất nặn thành viên bi đặc, thả vào chậu nước (quan sát nó chìm nghỉm).',
            'Vớt ra, dùng tay dàn mỏng đất nặn và nắn thành hình chiếc thuyền có lòng sâu, thành cao.',
            'Đặt nhẹ nhàng chiếc thuyền đất nặn lên mặt nước.'
          ],
          expected_outcome: 'Chiếc thuyền đất nặn nổi bồng bềnh và thậm chí có thể chở được vài chiếc cúc áo nhỏ.',
          safety_notes: 'Lau khô sàn nhà sau khi làm thí nghiệm để tránh trơn trượt.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Tại sao quả trứng gà chìm dưới đáy cốc nước ngọt nhưng lại nổi lên khi ta hòa thêm nhiều muối vào nước?',
        options: [
          { id: 'A', text: 'Nước muối nhẹ hơn nước ngọt' },
          { id: 'B', text: 'Nước muối đặc hơn và tác dụng lực đẩy lớn hơn lên quả trứng' },
          { id: 'C', text: 'Quả trứng bị teo nhẹ đi khi ngâm vào nước muối' },
          { id: 'D', text: 'Muối làm vỏ trứng cứng cáp hơn' }
        ],
        correct_answer: 'B',
        difficulty: 'medium',
        points: 10,
        hints: [
          { level: 1, hint: 'Nước muối có khối lượng riêng lớn hơn hay nhỏ hơn nước tinh khiết?' }
        ],
        explanation: 'Nước muối có khối lượng riêng lớn hơn nước ngọt, tạo ra lực đẩy hướng lên lớn hơn trọng lượng quả trứng, làm quả trứng nổi lên.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // GRADE 6
  // --------------------------------------------------------------------------
  {
    grade: 6,
    tier: 'middle',
    topicTitle: 'Lực, Khối lượng riêng & Trọng lượng',
    slug: 'lop-6-khoi-luong-rieng-trong-luong',
    topicDescription: 'Công thức tính khối lượng riêng D = m/V, trọng lượng P = 10m và phương pháp đo thể tích bình chia độ.',
    icon: 'Scale',
    lessonTitle: 'Khối lượng riêng và Trọng lượng riêng của vật thể',
    lessonSlug: 'khoi-luong-rieng-va-trong-luong-rieng',
    contentMarkdown: `# Khối lượng riêng và Trọng lượng

## 1. Khối lượng riêng
Khối lượng riêng của một chất được xác định bằng khối lượng của một đơn vị thể tích ($1\\,\\text{m}^3$) chất đó:
$$D = \\frac{m}{V}$$

Trong đó:
- $D$: Khối lượng riêng (đơn vị: $\\text{kg/m}^3$)
- $m$: Khối lượng của vật (đơn vị: $\\text{kg}$)
- $V$: Thể tích của vật (đơn vị: $\\text{m}^3$)

## 2. Trọng lượng và Trọng lượng riêng
Trọng lượng $P$ là độ lớn lực hút của Trái Đất tác dụng lên vật:
$$P = 10 \\cdot m$$

Trọng lượng riêng $d$ là trọng lượng của một mét khối chất đó:
$$d = \\frac{P}{V} = 10 \\cdot D$$ (đơn vị: $\\text{N/m}^3$)`,
    summary: 'Khối lượng riêng D = m/V (kg/m3). Trọng lượng P = 10m (N). Trọng lượng riêng d = 10D (N/m3).',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Khối lượng riêng ($D$) là khối lượng của $1\\,\\text{m}^3$ chất đó ($D = m/V$). Trọng lượng ($P$) là độ lớn lực hút Trái Đất tác dụng lên vật ($P = 10m$).',
      misconceptions: [
        'Nhầm lẫn giữa khối lượng (tính bằng kg) và trọng lượng (lực, tính bằng Newton - N).',
        'Tin rằng 1 kg sắt nặng hơn 1 kg bông.'
      ],
      guiding_questions: [
        'Nếu mẹ có 1 kg sắt và 1 kg bông gòn, vật nào có thể tích lớn hơn và vì sao?',
        'Làm thế nào để đo thể tích của một hòn đá có hình dạng góc cạnh gồ ghề bằng bình chia độ?'
      ],
      home_experiments: [
        {
          title: 'Đo thể tích hòn sỏi bằng bình chia độ',
          materials: ['1 bình chia độ hoặc cốc đong có vạch ml', 'Nước sạch', '1 hòn sỏi nhỏ'],
          steps: [
            'Đổ nước vào bình đến mức $V_1 = 150\\,\\text{ml}$.',
            'Thả nhẹ hòn sỏi chìm hoàn toàn vào nước, nước dâng lên mức $V_2 = 195\\,\\text{ml}$.',
            'Tính thể tích hòn sỏi: $V = V_2 - V_1 = 45\\,\\text{ml} = 45\\,\\text{cm}^3$.'
          ],
          expected_outcome: 'Học sinh hiểu phương pháp thể tích chiếm chỗ để đo thể tích vật thể hình dạng bất kỳ.',
          safety_notes: 'Thả sỏi nhẹ tay tránh làm vỡ cốc thủy tinh.'
        }
      ]
    },
    questions: [
      {
        question_type: 'mcq',
        prompt: 'Một vật có khối lượng $m = 350\\,\\text{g}$ thì trọng lượng $P$ của nó trên mặt đất xấp xỉ bằng bao nhiêu?',
        options: [
          { id: 'A', text: '35 N' },
          { id: 'B', text: '3.5 N' },
          { id: 'C', text: '3500 N' },
          { id: 'D', text: '0.35 N' }
        ],
        correct_answer: 'B',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Đổi khối lượng ra kg trước: $350\\,\\text{g} = 0.35\\,\\text{kg}$.' },
          { level: 2, hint: 'Áp dụng công thức liên hệ trọng lượng và khối lượng: $P = 10 \\cdot m$.' }
        ],
        explanation: '$m = 350\\,\\text{g} = 0.35\\,\\text{kg} \\implies P = 10 \\cdot m = 10 \\cdot 0.35 = 3.5\\,\\text{N}$.'
      },
      {
        question_type: 'numeric',
        prompt: 'Một khối nhôm có thể tích $V = 0.04\\,\\text{m}^3$ và khối lượng riêng của nhôm là $D = 2700\\,\\text{kg/m}^3$. Tính khối lượng $m$ của khối nhôm theo đơn vị $\\text{kg}$.',
        latex_formula: 'm = D \\cdot V',
        correct_answer: '108',
        numeric_tolerance: 0.02,
        numeric_unit: 'kg',
        hints: [
          { level: 1, hint: 'Từ công thức $D = \\frac{m}{V}$, suy ra công thức tính khối lượng $m = D \\cdot V$.' },
          { level: 2, hint: 'Thay số: $m = 2700 \\cdot 0.04$.' }
        ],
        explanation: '$m = D \\cdot V = 2700 \\cdot 0.04 = 108\\,\\text{kg}$.',
        difficulty: 'medium',
        points: 10
      }
    ]
  },

  // --------------------------------------------------------------------------
  // GRADE 7
  // --------------------------------------------------------------------------
  {
    grade: 7,
    tier: 'middle',
    topicTitle: 'Tốc độ, Chuyển động & Sóng âm',
    slug: 'lop-7-toc-do-chuyen-dong',
    topicDescription: 'Định nghĩa tốc độ v = s/t, chuyển đổi đơn vị km/h sang m/s và đọc đồ thị quãng đường - thời gian.',
    icon: 'Gauge',
    lessonTitle: 'Tốc độ chuyển động và Đồ thị Quãng đường - Thời gian',
    lessonSlug: 'toc-do-chuyen-dong-do-thi',
    contentMarkdown: `# Tốc độ chuyển động

## 1. Công thức tính tốc độ
Tốc độ là đại lượng đặc trưng cho sự nhanh, chậm của chuyển động:
$$v = \\frac{s}{t}$$

Trong đó:
- $v$: Tốc độ chuyển động ($\\text{m/s}$ hoặc $\\text{km/h}$)
- $s$: Quãng đường đi được ($\\text{m}$ hoặc $\\text{km}$)
- $t$: Thời gian đi hết quãng đường đó ($\\text{s}$ hoặc $\\text{h}$)

## 2. Quy tắc đổi đơn vị
$$1\\,\\text{m/s} = 3.6\\,\\text{km/h} \\iff 1\\,\\text{km/h} = \\frac{1}{3.6}\\,\\text{m/s}$$

## 3. Đồ thị Quãng đường - Thời gian ($s-t$)
- Đường biểu diễn dốc lên: vật chuyển động thẳng đều với tốc độ không đổi.
- Đường nằm ngang: vật đứng yên ($s$ không đổi theo thời gian).`,
    summary: 'Tốc độ v = s/t. Đổi đơn vị: 1 m/s = 3.6 km/h. Đồ thị s-t dốc lên là chuyển động, nằm ngang là đứng yên.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Tốc độ $v = s/t$ cho biết sự nhanh chậm của chuyển động. Đồ thị quãng đường - thời gian dốc lên là chuyển động đều, nằm ngang là vật đứng yên.',
      misconceptions: [
        'Nhầm lẫn giữa tốc độ tức thời tại 1 thời điểm với tốc độ trung bình trên toàn bộ chuyến đi.',
        'Nghĩ rằng đồ thị s-t nằm ngang nghĩa là vật đang chuyển động thẳng đều.'
      ],
      guiding_questions: [
        'Nếu con đi xe bus từ nhà tới trường dài 6 km hết 20 phút, tốc độ trung bình của xe bus là bao nhiêu km/h?',
        'Khi nhìn vào đồ thị $s-t$, đoạn nào nằm ngang thì người đi xe đang làm gì?'
      ],
      home_experiments: [
        {
          title: 'Bấm giờ tính tốc độ đi bộ',
          materials: ['1 chiếc thước dây đo cự ly', 'Điện thoại thông minh có ứng dụng bấm giờ (Stopwatch)'],
          steps: [
            'Dùng thước đo một đoạn đường thẳng trong hành lang hoặc sân dài $s = 15\\,\\text{m}$.',
            'Con đi bộ bình thường từ vạch xuất phát đến đích, phụ huynh bấm giờ thời gian $t$ (giây).',
            'Tính tốc độ: $v = 15 / t$ (m/s), sau đó nhân 3.6 để ra km/h.'
          ],
          expected_outcome: 'Học sinh tự trải nghiệm quá trình thu thập số liệu thực nghiệm và tính tốc độ.',
          safety_notes: 'Đi bộ trong khu vực an toàn, không có chướng ngại vật.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một người đi xe đạp chuyển động thẳng đều trên quãng đường dài $s = 9\\,\\text{km}$ hết thời gian $t = 30\\,\\text{phút}$. Tính tốc độ $v$ của người đó theo đơn vị $\\text{km/h}$.',
        latex_formula: 'v = \\frac{s}{t}',
        correct_answer: '18',
        numeric_tolerance: 0.02,
        numeric_unit: 'km/h',
        hints: [
          { level: 1, hint: 'Đổi 30 phút sang đơn vị giờ: $30\\,\\text{phút} = 0.5\\,\\text{h}$.' },
          { level: 2, hint: 'Áp dụng công thức $v = \\frac{s}{t} = \\frac{9}{0.5}$.' }
        ],
        explanation: '$t = 30\\,\\text{phút} = 0.5\\,\\text{h} \\implies v = \\frac{s}{t} = \\frac{9}{0.5} = 18\\,\\text{km/h}$.',
        difficulty: 'medium',
        points: 10
      },
      {
        question_type: 'mcq',
        prompt: 'Đổi tốc độ $v = 15\\,\\text{m/s}$ sang đơn vị $\\text{km/h}$, giá trị tương ứng là:',
        options: [
          { id: 'A', text: '45 km/h' },
          { id: 'B', text: '54 km/h' },
          { id: 'C', text: '36 km/h' },
          { id: 'D', text: '60 km/h' }
        ],
        correct_answer: 'B',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Quy tắc đổi từ m/s sang km/h: nhân với 3.6.' }
        ],
        explanation: '$v = 15 \\cdot 3.6 = 54\\,\\text{km/h}$.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // GRADE 8
  // --------------------------------------------------------------------------
  {
    grade: 8,
    tier: 'middle',
    topicTitle: 'Áp suất chất lỏng & Lực đẩy Archimedes',
    slug: 'lop-8-ap-suat-chat-long-archimedes',
    topicDescription: 'Định luật Archimedes FA = d.V, áp suất chất lỏng p = d.h và điều kiện chìm nổi của vật thể.',
    icon: 'Anchor',
    lessonTitle: 'Định luật Archimedes và Điều kiện chìm - nổi',
    lessonSlug: 'dinh-luat-archimedes-chim-noi',
    contentMarkdown: `# Lực đẩy Archimedes

## 1. Định luật Archimedes
Một vật nhúng vào chất lỏng bị chất lỏng tác dụng một lực đẩy hướng thẳng đứng từ dưới lên trên, độ lớn của lực này bằng trọng lượng của phần chất lỏng bị vật chiếm chỗ:
$$F_A = d \\cdot V$$

Trong đó:
- $F_A$: Lực đẩy Archimedes (đơn vị: $\\text{N}$)
- $d$: Trọng lượng riêng của chất lỏng (đơn vị: $\\text{N/m}^3$)
- $V$: Thể tích phần chất lỏng bị vật chiếm chỗ (đơn vị: $\\text{m}^3$)

## 2. Điều kiện chìm - nổi
So sánh trọng lực $P$ và lực đẩy Archimedes $F_A$:
- $F_A < P \\implies$ Vật chìm xuống đáy.
- $F_A = P \\implies$ Vật lơ lửng trong lòng chất lỏng hoặc nổi thăng bằng trên mặt thoáng.
- $F_A > P \\implies$ Vật chuyển động nổi lên trên.`,
    summary: 'Lực đẩy Archimedes FA = d.V. Vật chìm khi FA < P, lơ lửng/nổi khi FA = P, nổi lên khi FA > P.',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Lực đẩy Archimedes $F_A = d \\cdot V$ phụ thuộc vào trọng lượng riêng của chất lỏng và thể tích phần chất lỏng bị chiếm chỗ, không phụ thuộc vào độ sâu khi đã chìm hoàn toàn.',
      misconceptions: [
        'Nghĩ rằng vật càng lặn sâu xuống đáy hồ thì lực đẩy Archimedes tác dụng lên nó càng tăng lên.',
        'Nhầm thể tích chiếm chỗ $V$ với toàn bộ thể tích của bình chứa nước.'
      ],
      guiding_questions: [
        'Khi con bước xuống bể bơi ngập tới ngực, tại sao con cảm thấy bước đi nhẹ bẫng hơn trên cạn?',
        'Tại sao thợ lặn biển phải đeo đai chì nặng quanh thắt lưng mới lặn sâu xuống được?'
      ],
      home_experiments: [
        {
          title: 'Kiểm chứng lực nâng của nước bằng dây thun',
          materials: ['1 chai nước suối nhỏ đầy nước (330ml)', '1 sợi dây chun cao su dài', '1 xô nước sâu'],
          steps: [
            'Buộc sợi dây chun vào cổ chai nước.',
            'Cầm đầu dây chun nhấc chai nước lên trong không khí, dùng thước đo độ dài dây chun dãn ra ($L_1$).',
            'Hạ từ từ chai nước chìm vào trong xô nước, quan sát độ dài dây chun dãn ($L_2$).'
          ],
          expected_outcome: 'Dây chun co ngắn lại ($L_2 < L_1$) do nước tác dụng lực đẩy $F_A$ từ dưới lên.',
          safety_notes: 'Tránh làm đổ nước ra sàn nhà.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một khối kim loại có thể tích $V = 0.002\\,\\text{m}^3$ được nhúng chìm hoàn toàn trong nước có trọng lượng riêng $d = 10000\\,\\text{N/m}^3$. Tính độ lớn lực đẩy Archimedes $F_A$ tác dụng lên khối kim loại theo đơn vị Newton ($\\text{N}$).',
        latex_formula: 'F_A = d \\cdot V',
        correct_answer: '20',
        numeric_tolerance: 0.02,
        numeric_unit: 'N',
        hints: [
          { level: 1, hint: 'Áp dụng định luật Archimedes: $F_A = d \\cdot V$.' },
          { level: 2, hint: 'Thay số: $F_A = 10000 \\cdot 0.002$.' }
        ],
        explanation: '$F_A = d \\cdot V = 10000\\,\\text{N/m}^3 \\cdot 0.002\\,\\text{m}^3 = 20\\,\\text{N}$.',
        difficulty: 'medium',
        points: 10
      },
      {
        question_type: 'mcq',
        prompt: 'Khi một vật nổi thăng bằng trên mặt chất lỏng, mối quan hệ giữa trọng lượng $P$ của vật và lực đẩy Archimedes $F_A$ là:',
        options: [
          { id: 'A', text: 'F_A > P' },
          { id: 'B', text: 'F_A < P' },
          { id: 'C', text: 'F_A = P' },
          { id: 'D', text: 'F_A = 0' }
        ],
        correct_answer: 'C',
        difficulty: 'medium',
        points: 10,
        hints: [
          { level: 1, hint: 'Khi vật đã nổi thăng bằng (đứng yên), hai lực cùng phương ngược chiều tác dụng lên vật phải triệt tiêu nhau.' }
        ],
        explanation: 'Khi vật nổi thăng bằng, trọng lực và lực đẩy Archimedes cân bằng nhau, do đó $F_A = P$.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // GRADE 9
  // --------------------------------------------------------------------------
  {
    grade: 9,
    tier: 'middle',
    topicTitle: 'Định luật Ohm & Mạch điện một chiều',
    slug: 'lop-9-dinh-luat-ohm-dien-hoc',
    topicDescription: 'Định luật Ohm I = U/R, công thức điện trở tương đương mạch nối tiếp và song song.',
    icon: 'Activity',
    lessonTitle: 'Định luật Ohm cho đoạn mạch và Đoạn mạch nối tiếp, song song',
    lessonSlug: 'dinh-luat-ohm-noi-tiep-song-song',
    contentMarkdown: `# Điện học và Định luật Ohm

## 1. Định luật Ohm
Cường độ dòng điện chạy qua dây dẫn tỉ lệ thuận với hiệu điện thế đặt vào hai đầu dây và tỉ lệ nghịch với điện trở của dây:
$$I = \\frac{U}{R} \\iff U = I \\cdot R$$

Trong đó:
- $I$: Cường độ dòng điện (Ampe - $\\text{A}$)
- $U$: Hiệu điện thế (Vôn - $\\text{V}$)
- $R$: Điện trở (Ôm - $\\Omega$)

## 2. Đoạn mạch mắc nối tiếp
- $I = I_1 = I_2$
- $U = U_1 + U_2$
- $R_{td} = R_1 + R_2$

## 3. Đoạn mạch mắc song song
- $U = U_1 = U_2$
- $I = I_1 + I_2$
- $\\frac{1}{R_{td}} = \\frac{1}{R_1} + \\frac{1}{R_2} \\iff R_{td} = \\frac{R_1 R_2}{R_1 + R_2}$`,
    summary: 'Định luật Ohm: I = U/R. Nối tiếp: Rtd = R1 + R2. Song song: Rtd = (R1*R2)/(R1+R2).',
    durationMinutes: 20,
    parentGuide: {
      summary: 'Định luật Ohm $I = U/R$ mô tả dòng điện tỉ lệ thuận với hiệu điện thế và tỉ lệ nghịch với điện trở. Đèn trong nhà mắc song song để nếu một bóng cháy thì các bóng khác vẫn sáng.',
      misconceptions: [
        'Học sinh nghĩ rằng dòng điện đi qua điện trở sẽ bị tiêu hao bớt electron và I giảm dần theo chiều dòng điện.',
        'Nhầm lẫn công thức điện trở tương đương giữa mạch nối tiếp và song song.'
      ],
      guiding_questions: [
        'Tại sao các thiết bị điện và bóng đèn trong nhà lại được mắc song song mà không phải nối tiếp?',
        'Tại sao cầm bút thử điện cắm vào ổ điện thì đèn trong bút sáng nhưng người không bị giật?'
      ],
      home_experiments: [
        {
          title: 'Mô phỏng mạch đèn pin an toàn',
          materials: ['1 viên pin tiểu 1.5V (AA hoặc AAA)', '1 bóng đèn LED nhỏ', '2 mẩu dây đồng bọc nhựa gọt 2 đầu'],
          steps: [
            'Nối cực dương pin vào chân dài của LED.',
            'Nối cực âm pin vào chân ngắn của LED qua dây đồng.',
            'Mạch kín: LED phát sáng. Tháo rời 1 đầu dây (mạch hở): LED tắt.'
          ],
          expected_outcome: 'Trẻ hiểu trực quan khái niệm mạch kín (dòng điện chạy qua) và mạch hở.',
          safety_notes: 'Chỉ dùng pin 1.5V tiểu học sinh, TUYỆT ĐỐI KHÔNG làm thí nghiệm với điện lưới gia đình 220V.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Cho hai điện trở $R_1 = 20\\,\\Omega$ và $R_2 = 30\\,\\Omega$ mắc song song với nhau vào hiệu điện thế $U = 12\\,\\text{V}$. Tính điện trở tương đương $R_{td}$ của đoạn mạch theo đơn vị $\\Omega$.',
        latex_formula: 'R_{td} = \\frac{R_1 \\cdot R_2}{R_1 + R_2}',
        correct_answer: '12',
        numeric_tolerance: 0.02,
        numeric_unit: 'Ω',
        hints: [
          { level: 1, hint: 'Với mạch mắc song song hai điện trở: $R_{td} = \\frac{R_1 \\cdot R_2}{R_1 + R_2}$.' },
          { level: 2, hint: 'Thay số: $R_{td} = \\frac{20 \\cdot 30}{20 + 30} = \\frac{600}{50}$.' }
        ],
        explanation: '$R_{td} = \\frac{R_1 R_2}{R_1 + R_2} = \\frac{20 \\cdot 30}{50} = 12\\,\\Omega$.',
        difficulty: 'medium',
        points: 10
      },
      {
        question_type: 'mcq',
        prompt: 'Đặt một hiệu điện thế $U = 24\\,\\text{V}$ vào hai đầu điện trở $R = 8\\,\\Omega$. Cường độ dòng điện $I$ chạy qua điện trở là:',
        options: [
          { id: 'A', text: '3 A' },
          { id: 'B', text: '192 A' },
          { id: 'C', text: '0.33 A' },
          { id: 'D', text: '16 A' }
        ],
        correct_answer: 'A',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Áp dụng định luật Ohm: $I = \\frac{U}{R}$.' }
        ],
        explanation: 'Theo định luật Ohm: $I = \\frac{U}{R} = \\frac{24}{8} = 3\\,\\text{A}$.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // GRADE 10
  // --------------------------------------------------------------------------
  {
    grade: 10,
    tier: 'high',
    topicTitle: 'Động lực học chất điểm & Các định luật Newton',
    slug: 'lop-10-dong-luc-hoc-dinh-luat-newton',
    topicDescription: 'Ba định luật Newton, chuyển động biến đổi đều, lực ma sát trượt và định luật bảo toàn cơ năng.',
    icon: 'Compass',
    lessonTitle: 'Ba định luật Newton và Định luật bảo toàn năng lượng',
    lessonSlug: 'ba-dinh-luat-newton-bao-toan-nang-luong',
    contentMarkdown: `# Cơ học cổ điển và Ba định luật Newton

## 1. Định luật I Newton (Quán tính)
Nếu một vật không chịu tác dụng của lực nào hoặc chịu tác dụng của các lực có hợp lực bằng không, thì vật đang đứng yên sẽ tiếp tục đứng yên, đang chuyển động sẽ tiếp tục chuyển động thẳng đều.

## 2. Định luật II Newton
Gia tốc của một vật cùng hướng với lực tác dụng lên vật. Độ lớn của gia tốc tỉ lệ thuận với độ lớn của lực và tỉ lệ nghịch với khối lượng của vật:
$$\\vec{a} = \\frac{\\vec{F}_{net}}{m} \\iff \\vec{F}_{net} = m \\vec{a}$$

Lực ma sát trượt:
$$F_{mst} = \\mu_t \\cdot N$$

## 3. Định luật III Newton (Tác dụng - Phản tác dụng)
Trong mọi trường hợp, khi vật $A$ tác dụng lên vật $B$ một lực thì vật $B$ cũng tác dụng lại vật $A$ một lực. Hai lực này là hai lực trực đối:
$$\\vec{F}_{A \\to B} = -\\vec{F}_{B \\to A}$$`,
    summary: 'Ba định luật Newton: Fnet = ma, Fmst = mu*N, F_AB = -F_BA. Cơ năng W = Wd + Wt được bảo toàn.',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Ba định luật Newton là nền móng của cơ học cổ điển. Lực không phải là nguyên nhân duy trì chuyển động mà là nguyên nhân làm thay đổi vận tốc (tạo ra gia tốc a = F/m).',
      misconceptions: [
        'Vật đang chuyển động theo hướng nào thì bắt buộc phải có lực đẩy tác dụng theo hướng đó.',
        'Nghĩ rằng lực ma sát luôn có hại và cản trở mọi chuyển động.'
      ],
      guiding_questions: [
        'Tại sao khi ô tô phanh gấp, người ngồi trong xe lại bị xô dúi về phía trước?',
        'Nếu mặt đất hoàn toàn trơn nhẵn không có ma sát, con người có thể bước đi được không?'
      ],
      home_experiments: [
        {
          title: 'Kiểm chứng quán tính với đồng xu và tấm bìa',
          materials: ['1 cốc thủy tinh', '1 tấm bìa cứng vuông $8\\times 8\\text{cm}$', '1 đồng xu kim loại nặng'],
          steps: [
            'Đặt tấm bìa lên miệng cốc.',
            'Đặt đồng xu lên trên tấm bìa, ngay trên miệng cốc.',
            'Dùng ngón tay búng thật nhanh và dứt khoát vào mép tấm bìa.'
          ],
          expected_outcome: 'Tấm bìa bay đi theo phương ngang, đồng xu rơi thẳng đứng vào trong cốc do quán tính bảo toàn trạng thái đứng yên.',
          safety_notes: 'Búng nhẹ tay vừa đủ lực để tấm bìa bay đi.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một vật có khối lượng $m = 5\\,\\text{kg}$ đang đứng yên trên mặt sàn nằm ngang thì chịu tác dụng của một lực kéo nằm ngang $F = 25\\,\\text{N}$. Hệ số ma sát trượt giữa vật và sàn là $\\mu = 0.2$. Lấy $g = 10\\,\\text{m/s}^2$. Tính gia tốc $a$ của vật theo đơn vị $\\text{m/s}^2$.',
        latex_formula: 'a = \\frac{F - \\mu m g}{m}',
        correct_answer: '3',
        numeric_tolerance: 0.02,
        numeric_unit: 'm/s^2',
        hints: [
          { level: 1, hint: 'Tính áp lực $N = P = m \\cdot g$ và lực ma sát trượt: $F_{ms} = \\mu \\cdot N$.' },
          { level: 2, hint: 'Áp dụng định luật II Newton theo phương ngang: $F - F_{ms} = m \\cdot a$.' },
          { level: 3, hint: '$F_{ms} = 0.2 \\cdot 5 \\cdot 10 = 10\\,\\text{N} \\implies a = \\frac{25 - 10}{5} = 3.0\\,\\text{m/s}^2$.' }
        ],
        explanation: '$N = mg = 5 \\cdot 10 = 50\\,\\text{N} \\implies F_{ms} = 0.2 \\cdot 50 = 10\\,\\text{N} \\implies F_{net} = 25 - 10 = 15\\,\\text{N} \\implies a = \\frac{15}{5} = 3\\,\\text{m/s}^2$.',
        difficulty: 'hard',
        points: 15
      },
      {
        question_type: 'mcq',
        prompt: 'Theo định luật III Newton, cặp lực và phản lực:',
        options: [
          { id: 'A', text: 'Cùng tác dụng vào một vật nên triệt tiêu lẫn nhau' },
          { id: 'B', text: 'Tác dụng vào hai vật khác nhau, cùng phương, ngược chiều và cùng độ lớn' },
          { id: 'C', text: 'Xuất hiện không đồng thời' },
          { id: 'D', text: 'Luôn luôn có độ lớn khác nhau' }
        ],
        correct_answer: 'B',
        difficulty: 'medium',
        points: 10,
        hints: [
          { level: 1, hint: 'Lực và phản lực đặt vào hai vật khác nhau hay cùng một vật?' }
        ],
        explanation: 'Lực và phản lực là cặp lực tương tác giữa hai vật: đặt vào hai vật khác nhau, cùng phương, ngược chiều, cùng độ lớn và xuất hiện đồng thời.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // GRADE 11
  // --------------------------------------------------------------------------
  {
    grade: 11,
    tier: 'high',
    topicTitle: 'Dao động điều hòa & Sóng cơ học',
    slug: 'lop-11-dao-dong-dieu-hoa-song-co',
    topicDescription: 'Phương trình dao động điều hòa x = A cos(wt+phi), con lắc lò xo, con lắc đơn và truyền sóng cơ.',
    icon: 'Radio',
    lessonTitle: 'Phương trình dao động điều hòa và Con lắc lò xo',
    lessonSlug: 'dao-dong-dieu-hoa-con-lac-lo-xo',
    contentMarkdown: `# Dao động điều hòa

## 1. Phương trình dao động điều hòa
$$x = A \\cos(\\omega t + \\varphi)$$

Trong đó:
- $x$: Li độ của dao động ($\\text{cm}$ hoặc $\\text{m}$)
- $A$: Biên độ dao động ($A > 0$)
- $\\omega$: Tần số góc ($\\text{rad/s}$)
- $(\\omega t + \\varphi)$: Pha dao động tại thời điểm $t$ ($\\text{rad}$)
- $\\varphi$: Pha ban đầu tại $t = 0$ ($\\text{rad}$)

## 2. Vận tốc và Gia tốc
$$v = x' = -\\omega A \\sin(\\omega t + \\varphi)$$
$$a = v' = -\\omega^2 A \\cos(\\omega t + \\varphi) = -\\omega^2 x$$

## 3. Con lắc lò xo
Tần số góc và chu kì của con lắc lò xo treo hoặc nằm ngang:
$$\\omega = \\sqrt{\\frac{k}{m}} \\implies T = \\frac{2\\pi}{\\omega} = 2\\pi \\sqrt{\\frac{m}{k}}$$`,
    summary: 'Dao động điều hòa: x = A cos(wt+phi). Vận tốc v = -wA sin(wt+phi). Con lắc lò xo: T = 2*pi*sqrt(m/k).',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Dao động điều hòa là dao động mà li độ là hàm sin hoặc cosin của thời gian. Chu kì con lắc lò xo $T = 2\\pi\\sqrt{m/k}$ chỉ phụ thuộc khối lượng và độ cứng lò xo, không phụ thuộc biên độ.',
      misconceptions: [
        'Biên độ dao động càng lớn thì chu kì dao động càng dài.',
        'Tại vị trí cân bằng thì gia tốc của vật đạt giá trị cực đại (thực tế tại VTCB x=0 nên a=0).'
      ],
      guiding_questions: [
        'Khi con ngồi trên xích đu đung đưa, vị trí nào con thấy mình đạt vận tốc lớn nhất, vị trí nào con tạm dừng?',
        'Tại sao khi một đoàn quân hành quân bước đều qua cầu treo thì lại bị cấm bước đều (hiện tượng cộng hưởng)?'
      ],
      home_experiments: [
        {
          title: 'Khảo sát chu kì con lắc đơn tại gia',
          materials: ['1 sợi chỉ dài 1 mét', '1 chùm chìa khóa nhỏ làm vật nặng', 'Đồng hồ bấm giờ điện thoại'],
          steps: [
            'Buộc chùm chìa khóa vào sợi chỉ, cố định đầu kia lên móc treo.',
            'Kéo lệch góc nhỏ ($\\\\approx 10^\\\\circ$), thả nhẹ không vận tốc đầu.',
            'Bấm giờ 10 dao động toàn phần, chia 10 để tính chu kì $T_1$. Cắt ngắn dây còn 0.25m và đo lại $T_2$.'
          ],
          expected_outcome: 'Khi chiều dài giảm 4 lần, chu kì giảm 2 lần ($T \\\\sim \\\\sqrt{l}$).',
          safety_notes: 'Treo móc chắc chắn tránh rơi chìa khóa.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một con lắc lò xo có độ cứng $k = 100\\,\\text{N/m}$ gắn với vật nặng có khối lượng $m = 0.25\\,\\text{kg}$. Lấy $\\pi^2 \\approx 10$. Tính chu kì dao động riêng $T$ của con lắc theo đơn vị giây ($\\text{s}$).',
        latex_formula: 'T = 2\\pi \\sqrt{\\frac{m}{k}}',
        correct_answer: '0.314',
        numeric_tolerance: 0.05,
        numeric_unit: 's',
        hints: [
          { level: 1, hint: 'Tần số góc của con lắc lò xo: $\\omega = \\sqrt{\\frac{k}{m}}$.' },
          { level: 2, hint: 'Chu kì dao động: $T = \\frac{2\\pi}{\\omega} = 2\\pi \\sqrt{\\frac{m}{k}}$.' },
          { level: 3, hint: '$\\omega = \\sqrt{\\frac{100}{0.25}} = \\sqrt{400} = 20\\,\\text{rad/s} \\implies T = \\frac{2\\pi}{20} = \\frac{\\pi}{10} \\approx 0.314\\,\\text{s}$.' }
        ],
        explanation: '$\\omega = \\sqrt{100 / 0.25} = 20\\,\\text{rad/s} \\implies T = \\frac{2\\pi}{20} \\approx 0.314\\,\\text{s}$.',
        difficulty: 'hard',
        points: 15
      },
      {
        question_type: 'mcq',
        prompt: 'Một chất điểm dao động điều hòa theo phương trình $x = 8 \\cos(5\\pi t - \\frac{\\pi}{6})\\,\\text{cm}$. Biên độ dao động $A$ và pha ban đầu $\\varphi$ của dao động lần lượt là:',
        options: [
          { id: 'A', text: 'A = 8 cm, \\varphi = -\\pi/6 rad' },
          { id: 'B', text: 'A = 8 cm, \\varphi = 5\\pi rad' },
          { id: 'C', text: 'A = 16 cm, \\varphi = \\pi/6 rad' },
          { id: 'D', text: 'A = 5 cm, \\varphi = -\\pi/6 rad' }
        ],
        correct_answer: 'A',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Đối chiếu phương trình dao động với dạng tổng quát: $x = A \\cos(\\omega t + \\varphi)$.' }
        ],
        explanation: 'Đối chiếu dạng chuẩn $x = A \\cos(\\omega t + \\varphi)$, ta có $A = 8\\,\\text{cm}$ và $\\varphi = -\\frac{\\pi}{6}\\,\\text{rad}$.'
      }
    ]
  },

  // --------------------------------------------------------------------------
  // GRADE 12
  // --------------------------------------------------------------------------
  {
    grade: 12,
    tier: 'high',
    topicTitle: 'Thuyết động học phân tử chất khí & Vật lý Hạt nhân',
    slug: 'lop-12-khi-ly-tuong-vat-ly-hat-nhan',
    topicDescription: 'Phương trình trạng thái khí lý tưởng pV = nRT, các định luật chất khí và năng lượng liên kết hạt nhân.',
    icon: 'Atom',
    lessonTitle: 'Phương trình trạng thái khí lý tưởng và Năng lượng liên kết hạt nhân',
    lessonSlug: 'khi-ly-tuong-nang-luong-hat-nhan',
    contentMarkdown: `# Khí lý tưởng & Vật lý Hạt nhân

## 1. Phương trình Clapeyron - Mendeleev
$$p V = n R T = \\frac{m}{M} R T$$

Trong đó:
- $p$: Áp suất chất khí ($\\text{Pa}$ hoặc $\\text{atm}$)
- $V$: Thể tích khối khí ($\\text{m}^3$)
- $T$: Nhiệt độ tuyệt đối theo thang Kelvin ($T = t^\\circ\\text{C} + 273$)
- $R \\approx 8.31\\,\\text{J/(mol}\\cdot\\text{K)}$: Hằng số khí lý tưởng

Quá trình đẳng tích (Định luật Charles):
$$\\frac{p_1}{T_1} = \\frac{p_2}{T_2}$$

## 2. Năng lượng liên kết hạt nhân
Độ hụt khối lượng:
$$\\Delta m = [Z m_p + (A - Z) m_n] - m_X$$

Hệ thức Einstein về năng lượng:
$$E = m \\cdot c^2 \\implies E_{lk} = \\Delta m \\cdot c^2$$`,
    summary: 'Phương trình pV = nRT. Đẳng tích: p1/T1 = p2/T2. Năng lượng liên kết hạt nhân: Elk = Delta_m * c^2.',
    durationMinutes: 25,
    parentGuide: {
      summary: 'Áp suất, thể tích và nhiệt độ tuyệt đối của khối khí tuân theo pV/T = const. Năng lượng hạt nhân khổng lồ giải phóng nhờ độ hụt khối lượng chuyển hóa thành năng lượng theo hệ thức E = mc^2 của Einstein.',
      misconceptions: [
        'Nhiệt độ 0 độ C nghĩa là các phân tử khí đã dừng chuyển động nhiệt hoàn toàn (điểm dừng là 0 K = -273.15 độ C).',
        'Nghĩ rằng khối lượng của hạt nhân bằng đúng tổng khối lượng của các proton và neutron riêng lẻ cấu thành nên nó.'
      ],
      guiding_questions: [
        'Tại sao săm lốp xe đạp bơm căng để ngoài trời nắng gắt mùa hè lại dễ bị nổ?',
        'Mặt Trời đã tỏa sáng hàng tỉ năm qua bằng loại phản ứng hạt nhân nào?'
      ],
      home_experiments: [
        {
          title: 'Quả bóng bàn phồng lại nhờ nhiệt độ',
          materials: ['1 quả bóng bàn bị móp lõm (không bị thủng rách)', '1 cốc nước nóng khoảng $80^\\circ\\text{C}$'],
          steps: [
            'Thả quả bóng bàn móp vào cốc nước nóng.',
            'Quan sát trong 30-60 giây.'
          ],
          expected_outcome: 'Không khí bên trong quả bóng nhận nhiệt, nhiệt độ T tăng làm áp suất p tăng, đẩy vỏ bóng phồng căng trở lại hình dạng cầu ban đầu.',
          safety_notes: 'Thao tác với nước nóng cẩn thận tránh bỏng.'
        }
      ]
    },
    questions: [
      {
        question_type: 'numeric',
        prompt: 'Một bình kín có dung tích không đổi $V$ chứa lượng khí ở nhiệt độ $t_1 = 27^\\circ\\text{C}$ và áp suất $p_1 = 1.5\\,\\text{atm}$. Đun nóng bình khí đến nhiệt độ $t_2 = 127^\\circ\\text{C}$. Tính áp suất $p_2$ của lượng khí trong bình theo đơn vị $\\text{atm}$.',
        latex_formula: 'p_2 = p_1 \\cdot \\frac{T_2}{T_1}',
        correct_answer: '2.0',
        numeric_tolerance: 0.05,
        numeric_unit: 'atm',
        hints: [
          { level: 1, hint: 'Đổi nhiệt độ Celsius sang thang Kelvin: $T = t + 273$.' },
          { level: 2, hint: '$T_1 = 27 + 273 = 300\\,\\text{K}$; $T_2 = 127 + 273 = 400\\,\\text{K}$.' },
          { level: 3, hint: 'Áp dụng định luật Charles (đẳng tích): $\\frac{p_1}{T_1} = \\frac{p_2}{T_2} \\implies p_2 = 1.5 \\cdot \\frac{400}{300} = 2.0\\,\\text{atm}$.' }
        ],
        explanation: '$T_1 = 300\\,\\text{K}, T_2 = 400\\,\\text{K} \\implies p_2 = p_1 \\frac{T_2}{T_1} = 1.5 \\cdot \\frac{400}{300} = 2.0\\,\\text{atm}$.',
        difficulty: 'hard',
        points: 15
      },
      {
        question_type: 'mcq',
        prompt: 'Hệ thức nổi tiếng của Einstein về mối liên hệ giữa năng lượng $E$ và khối lượng $m$ là:',
        options: [
          { id: 'A', text: 'E = m \\cdot c^2' },
          { id: 'B', text: 'E = \\frac{1}{2} m c^2' },
          { id: 'C', text: 'E = m \\cdot c' },
          { id: 'D', text: 'E = \\frac{m}{c^2}' }
        ],
        correct_answer: 'A',
        difficulty: 'easy',
        points: 10,
        hints: [
          { level: 1, hint: 'Công thức tương đối tính hẹp của Albert Einstein!' }
        ],
        explanation: 'Hệ thức Einstein: $E = m c^2$, trong đó $c \\approx 3 \\cdot 10^8\\,\\text{m/s}$ là tốc độ ánh sáng trong chân không.'
      }
    ]
  }
];
