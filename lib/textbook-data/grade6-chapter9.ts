import type { TextbookChapterSeed } from '../textbook';

export const CHAPTER_9: TextbookChapterSeed = {
  number: 9,
  roman: 'IX',
  title: 'Năng lượng',
  description: 'Khám phá các dạng năng lượng, định luật bảo toàn và chuyển hóa năng lượng, năng lượng hao phí và năng lượng tái tạo sạch.',
  lessons: [
    {
      number: 46,
      title: 'Năng lượng và sự truyền năng lượng',
      objectives: [
        'Nêu được mọi hoạt động sống và biến đổi đều cần có năng lượng.',
        'Hiểu năng lượng có thể truyền từ vật này sang vật khác qua tác dụng lực hoặc truyền nhiệt.',
        'Nêu được đơn vị đo năng lượng là Jun (J) và Calo (cal).'
      ],
      content: `## I. Năng lượng là gì?
- **Năng lượng** là khả năng tác dụng lực, thực hiện công hoặc truyền nhiệt của một vật thể.
- Mọi hoạt động của con người, máy móc, cây cối, thời tiết đều cần có năng lượng:
  - Ta ăn cơm để nạp năng lượng hoạt động và học tập.
  - Xe máy cần đổ xăng để lấy năng lượng chạy trên đường.
  - Cây xanh hấp thụ năng lượng ánh sáng Mặt Trời để quang hợp.

## II. Đơn vị đo và sự truyền năng lượng
- Đơn vị đo năng lượng trong hệ SI là **Jun** (kí hiệu: $\\text{J}$).
- Đơn vị năng lượng trong dinh dưỡng thực phẩm thường dùng là **Calo** ($\\text{cal}$) hoặc **Kilôcalo** ($\\text{kcal}$):
  $$1\\text{ cal} \\approx 4.184\\text{ J}$$
  $$1\\text{ kJ} = 1000\\text{ J}$$
- **Sự truyền năng lượng**:
  - Truyền qua **tác dụng lực**: Gió tác dụng lực truyền năng lượng làm quay cánh quạt cối xay.
  - Truyền qua **truyền nhiệt**: Ngọn lửa truyền nhiệt năng làm sôi ấm nước.`,
      keyPoints: [
        'Mọi hoạt động đều cần năng lượng. Đơn vị đo năng lượng chuẩn SI là Jun (J).',
        '1 cal xấp xỉ 4.184 J; 1 kJ = 1000 J.',
        'Năng lượng truyền từ vật này sang vật khác qua tác dụng lực hoặc truyền nhiệt.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Đơn vị đo năng lượng chuẩn trong hệ thống đo lường quốc tế SI là gì?',
          options: [
            { id: 'A', text: 'Niutơn (N)' },
            { id: 'B', text: 'Jun (J)' },
            { id: 'C', text: 'Oát (W)' },
            { id: 'D', text: 'Vôn (V)' }
          ],
          answer: 'B',
          hints: ['Kí hiệu là J, đặt theo tên nhà bác học James Prescott Joule.'],
          explanation: 'Jun (J) là đơn vị đo năng lượng và công trong hệ SI.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Trường hợp nào dưới đây là ví dụ về năng lượng được truyền qua TÁC DỤNG LỰC?',
          options: [
            { id: 'A', text: 'Ánh nắng Mặt Trời sưởi ấm bãi cát ven biển' },
            { id: 'B', text: 'Cơn gió mạnh đẩy cánh buồm làm thuyền lướt đi trên sóng' },
            { id: 'C', text: 'Thìa kim loại cắm trong bát canh nóng bị ấm lên' },
            { id: 'D', text: 'Cục than hoa cháy đỏ tỏa hơi nóng' }
          ],
          answer: 'B',
          hints: ['Gió tác dụng một lực đẩy vào cánh buồm làm thuyền di chuyển.'],
          explanation: 'Gió tạo lực đẩy cơ học lên cánh buồm để truyền động năng cho thuyền buồm.'
        },
        {
          level: 'van_dung',
          type: 'numeric',
          prompt: 'Một thanh sô-cô-la cung cấp 250 kcal năng lượng cho cơ thể. Biết 1 kcal = 4184 J, năng lượng mà thanh sô-cô-la này cung cấp quy đổi ra đơn vị kilôjun (kJ) là bao nhiêu?',
          answer: '1046',
          tolerance: 0.02,
          unit: 'kJ',
          hints: ['Lấy 250 nhân với 4184 rồi chia cho 1000 để đổi ra kJ.'],
          explanation: 'Năng lượng = (250 * 4184) / 1000 = 1046 kJ.'
        },
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Năng lượng có thể truyền từ vật này sang vật khác thông qua những hình thức chủ yếu nào?',
          options: [
            { id: 'A', text: 'Chỉ qua sự chiếu sáng' },
            { id: 'B', text: 'Qua truyền nhiệt hoặc qua tác dụng lực' },
            { id: 'C', text: 'Chỉ qua phản ứng hóa học' },
            { id: 'D', text: 'Chỉ qua dây dẫn điện' }
          ],
          answer: 'B',
          hints: ['Năng lượng truyền qua tác dụng lực (sinh công) hoặc truyền nhiệt.'],
          explanation: 'Hai con đường cơ bản để truyền năng lượng là truyền nhiệt và tác dụng lực.'
        },
        {
          level: 'thong_hieu',
          type: 'numeric',
          prompt: 'Một quả bóng lăn có động năng 3.6 kJ. Quy đổi động năng của quả bóng sang đơn vị Jun (J).',
          answer: '3600',
          tolerance: 0.02,
          unit: 'J',
          hints: ['1 kJ = 1000 J. Hãy nhân 3.6 với 1000.'],
          explanation: '3.6 kJ = 3.6 * 1000 = 3600 J.'
        }
      ]
    },
    {
      number: 47,
      title: 'Một số dạng năng lượng',
      objectives: [
        'Phân biệt được động năng và thế năng (thế năng trọng trường, thế năng đàn hồi).',
        'Nhận biết được quang năng, nhiệt năng, điện năng, hóa năng và năng lượng hạt nhân.'
      ],
      content: `## I. Động năng và Thế năng (Cơ năng)
- **Động năng**: Dạng năng lượng mà một vật có được do nó đang **chuyển động**. Vật chuyển động càng nhanh và khối lượng càng lớn thì động năng càng lớn (dòng nước lũ cuồn cuộn, viên đạn bay).
- **Thế năng**:
  - *Thế năng trọng trường*: Vật có được khi ở một **độ cao** nhất định so với mặt đất (quả dừa trên ngọn cây, nước trên đập cao).
  - *Thế năng đàn hồi*: Vật có được khi bị **biến dạng đàn hồi** (lò xo bị nén, dây cung giương căng).

## II. Các dạng năng lượng khác
- **Nhiệt năng**: Năng lượng nhiệt làm nóng vật thể (nước sôi, dung nham núi lửa).
- **Quang năng**: Năng lượng của ánh sáng (ánh sáng Mặt Trời, tia laser, đèn LED).
- **Điện năng**: Năng lượng do dòng điện mang lại (dòng điện chạy máy giặt, tivi).
- **Hóa năng**: Năng lượng lưu trữ trong các liên kết hóa học (thức ăn, pin, xăng dầu, than đá).`,
      keyPoints: [
        'Động năng gắn liền với chuyển động; thế năng gắn với độ cao hoặc độ biến dạng đàn hồi.',
        'Quang năng là năng lượng ánh sáng; điện năng do dòng điện cung cấp; hóa năng ẩn chứa trong xăng dầu, thức ăn.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Vật nào sau đây sở hữu THẾ NĂNG TRỌNG TRƯỜNG lớn?',
          options: [
            { id: 'A', text: 'Quả tạ nặng đang nằm yên trên mặt đất' },
            { id: 'B', text: 'Khối nước khổng lồ tích trữ trên lòng hồ đập thủy điện ở trên núi cao' },
            { id: 'C', text: 'Chiếc lò xo đang ở trạng thái tự nhiên không dãn không nén' },
            { id: 'D', text: 'Cục than hoa nguội ngắt' }
          ],
          answer: 'B',
          hints: ['Khối lượng lớn và ở độ cao lớn so với mặt đất.'],
          explanation: 'Nước ở hồ chứa trên cao có thế năng trọng trường lớn do độ cao và khối lượng khổng lồ.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Một mũi tên vừa được bắn ra khỏi cung tên đang bay vút trên bầu trời sở hữu những dạng cơ năng nào?',
          options: [
            { id: 'A', text: 'Chỉ có động năng' },
            { id: 'B', text: 'Chỉ có thế năng đàn hồi' },
            { id: 'C', text: 'Vừa có động năng (do đang bay) vừa có thế năng trọng trường (do ở trên cao)' },
            { id: 'D', text: 'Không sở hữu cơ năng nào' }
          ],
          answer: 'C',
          hints: ['Mũi tên vừa có vận tốc chuyển động vừa có độ cao so với mặt đất.'],
          explanation: 'Mũi tên bay có vận tốc nên có động năng, ở trên cao nên có thế năng trọng trường.'
        },
        {
          level: 'van_dung',
          type: 'mcq',
          prompt: 'Trong một viên pin tiểu còn mới nguyên vẹn chưa sử dụng, năng lượng được tích trữ chủ yếu dưới dạng nào?',
          options: [
            { id: 'A', text: 'Hóa năng' },
            { id: 'B', text: 'Động năng' },
            { id: 'C', text: 'Quang năng' },
            { id: 'D', text: 'Thế năng đàn hồi' }
          ],
          answer: 'A',
          hints: ['Năng lượng hóa học nằm trong các chất hóa giải bên trong pin.'],
          explanation: 'Pin dự trữ hóa năng, khi nối mạch kín thì hóa năng biến thành điện năng.'
        },
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Năng lượng dự trữ trong thức ăn (tinh bột, chất đạm, chất béo) mà cơ thể người hấp thụ hàng ngày thuộc dạng nào?',
          options: [
            { id: 'A', text: 'Hóa năng' },
            { id: 'B', text: 'Điện năng' },
            { id: 'C', text: 'Quang năng' },
            { id: 'D', text: 'Cơ năng' }
          ],
          answer: 'A',
          hints: ['Năng lượng tích trữ trong các liên kết hóa học của chất hữu cơ.'],
          explanation: 'Thức ăn dự trữ hóa năng, qua quá trình tiêu hóa biến đổi thành nhiệt năng và động năng nuôi sống cơ thể.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Một chiếc ô tô đang tăng tốc chạy nhanh dần trên đường cao tốc bằng phẳng. Dạng năng lượng nào của chiếc ô tô đang TĂNG LÊN?',
          options: [
            { id: 'A', text: 'Động năng của ô tô' },
            { id: 'B', text: 'Thế năng trọng trường' },
            { id: 'C', text: 'Thế năng đàn hồi' },
            { id: 'D', text: 'Hóa năng' }
          ],
          answer: 'A',
          hints: ['Động năng gắn liền với vận tốc chuyển động. Vận tốc càng lớn thì động năng càng lớn.'],
          explanation: 'Xe chuyển động càng nhanh thì động năng của xe càng tăng.'
        }
      ]
    },
    {
      number: 48,
      title: 'Sự chuyển hóa năng lượng',
      objectives: [
        'Nêu được định luật bảo toàn năng lượng trong tự nhiên.',
        'Phân tích được sơ đồ chuyển hóa năng lượng trong các thiết bị quen thuộc hàng ngày.'
      ],
      content: `## I. Sự chuyển hóa qua lại giữa các dạng năng lượng
Năng lượng có thể biến đổi liên tục từ dạng này sang dạng khác:
- **Đèn sợi đốt / đèn LED**: Điện năng $\\rightarrow$ Quang năng + Nhiệt năng.
- **Nồi cơm điện, bàn là**: Điện năng $\\rightarrow$ Nhiệt năng.
- **Quạt điện, máy bơm**: Điện năng $\\rightarrow$ Cơ năng (làm quay trục).
- **Cơ thể người**: Hóa năng trong thức ăn $\\rightarrow$ Nhiệt năng (giữ ấm) + Động năng (đi lại, chạy nhảy).
- **Xe máy chạy xăng**: Hóa năng trong xăng $\\rightarrow$ Nhiệt năng (đốt cháy) $\\rightarrow$ Cơ năng (lăn bánh).

## II. Định luật bảo toàn năng lượng
> **Định luật**: Năng lượng không tự nhiên sinh ra, cũng không tự nhiên mất đi, nó chỉ chuyển hóa từ dạng này sang dạng khác, hoặc truyền từ vật này sang vật khác.`,
      keyPoints: [
        'Năng lượng luôn chuyển hóa qua lại giữa các dạng: hóa năng, điện năng, cơ năng, quang năng, nhiệt năng.',
        'Định luật bảo toàn năng lượng: Năng lượng không tự sinh ra và không tự mất đi.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Nội dung cốt lõi của Định luật bảo toàn năng lượng khẳng định điều gì?',
          options: [
            { id: 'A', text: 'Năng lượng tự nhiên sinh ra khi ta cần dùng' },
            { id: 'B', text: 'Năng lượng có thể bị tiêu hủy biến mất hoàn toàn vào hư vô' },
            { id: 'C', text: 'Năng lượng không tự sinh ra cũng không tự mất đi, chỉ chuyển hóa từ dạng này sang dạng khác' },
            { id: 'D', text: 'Tổng năng lượng của vũ trụ luôn giảm dần theo thời gian' }
          ],
          answer: 'C',
          hints: ['Năng lượng chỉ đổi dạng hoặc truyền từ vật này sang vật khác.'],
          explanation: 'Định luật bảo toàn năng lượng khẳng định tổng năng lượng của hệ kín là không đổi.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Khi ta cắm điện và bật công tắc máy sấy tóc, điện năng được chuyển hóa chủ yếu thành những dạng năng lượng nào?',
          options: [
            { id: 'A', text: 'Hóa năng và quang năng' },
            { id: 'B', text: 'Nhiệt năng (làm nóng dây mayso) và cơ năng (thổi gió)' },
            { id: 'C', text: 'Năng lượng hạt nhân và thế năng' },
            { id: 'D', text: 'Chỉ biến thành quang năng' }
          ],
          answer: 'B',
          hints: ['Máy sấy tạo ra luồng gió nóng: gió là cơ năng, nóng là nhiệt năng.'],
          explanation: 'Máy sấy tóc biến điện năng thành nhiệt năng đốt nóng và cơ năng làm quay quạt gió.'
        },
        {
          level: 'van_dung',
          type: 'mcq',
          prompt: 'Khi một chiếc ô tô leo dốc và phanh dừng lại trên đỉnh dốc, động năng ban đầu của xe đã chuyển hóa thành những dạng năng lượng nào?',
          options: [
            { id: 'A', text: 'Thế năng trọng trường ở đỉnh dốc và nhiệt năng hao phí trên lốp xe, má phanh' },
            { id: 'B', text: 'Quang năng chiếu sáng' },
            { id: 'C', text: 'Năng lượng hóa học tích vào bình xăng' },
            { id: 'D', text: 'Năng lượng biến mất hoàn toàn không để lại dấu vết' }
          ],
          answer: 'A',
          hints: ['Xe lên cao có thế năng, phanh xe bị nóng lên do ma sát (nhiệt năng).'],
          explanation: 'Động năng chuyển hóa thành thế năng trọng trường (tích lũy độ cao) và nhiệt năng hao phí ở má phanh.'
        },
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Trong bàn là điện gia đình, điện năng được chuyển hóa chủ yếu thành dạng năng lượng nào để ủi phẳng quần áo?',
          options: [
            { id: 'A', text: 'Cơ năng' },
            { id: 'B', text: 'Nhiệt năng làm nóng đế bàn là' },
            { id: 'C', text: 'Quang năng' },
            { id: 'D', text: 'Hóa năng' }
          ],
          answer: 'B',
          hints: ['Bàn là nóng rực lên nhờ dây dẫn nhiệt.'],
          explanation: 'Bàn là điện biến đổi điện năng thành nhiệt năng có ích để làm phẳng sợi vải.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Khi một em bé chơi cầu trượt, trượt từ đỉnh máng trượt xuống đất, có sự chuyển hóa năng lượng như thế nào?',
          options: [
            { id: 'A', text: 'Thế năng trọng trường ở đỉnh máng chuyển hóa dần thành động năng trượt xuống' },
            { id: 'B', text: 'Điện năng biến thành quang năng' },
            { id: 'C', text: 'Hóa năng biến thành thế năng đàn hồi' },
            { id: 'D', text: 'Năng lượng tự nhiên biến mất' }
          ],
          answer: 'A',
          hints: ['Độ cao giảm dần thì thế năng giảm, vận tốc tăng dần thì động năng tăng.'],
          explanation: 'Thế năng trọng trường ở trên cao biến thành động năng chuyển động trượt xuống.'
        }
      ]
    },
    {
      number: 49,
      title: 'Năng lượng hao phí',
      objectives: [
        'Phân biệt được phần năng lượng có ích và phần năng lượng hao phí trong các quá trình sử dụng.',
        'Nhận biết nhiệt năng và âm thanh thường là dạng năng lượng hao phí chủ yếu.'
      ],
      content: `## I. Năng lượng có ích và năng lượng hao phí
Trong mọi quá trình chuyển hóa năng lượng:
- **Năng lượng có ích**: Phần năng lượng phục vụ đúng mục đích sử dụng ban đầu của con người.
  - Ví dụ: Ở bóng đèn thắp sáng, **quang năng** là năng lượng có ích.
- **Năng lượng hao phí**: Phần năng lượng không mong muốn xuất hiện ngoài ý muốn của người dùng.
  - Ví dụ: Ở bóng đèn, phần điện năng biến thành **nhiệt năng làm nóng bóng đèn** là năng lượng hao phí.
- Tổng năng lượng = Năng lượng có ích + Năng lượng hao phí.

## II. Nguyên nhân gây hao phí
- Dạng năng lượng hao phí thường gặp nhất là **nhiệt năng** (sinh ra do ma sát, điện trở) và **âm thanh** (tiếng ồn động cơ rung).
- Cải tiến kỹ thuật (động cơ biến tần Inverter, đèn LED thay thế đèn sợi đốt) nhằm mục đích giảm tối đa năng lượng hao phí.`,
      keyPoints: [
        'Năng lượng có ích phục vụ mục đích; năng lượng hao phí bị thất thoát vô ích.',
        'Nhiệt năng do ma sát và tiếng ồn là hai dạng hao phí phổ biến nhất.',
        'Đèn LED tiết kiệm điện vì tỏa nhiệt rất ít so với đèn sợi đốt truyền thống.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Khi sử dụng bóng đèn điện để thắp sáng phòng học vào ban đêm, dạng năng lượng nào dưới đây là NĂNG LƯỢNG CÓ ÍCH?',
          options: [
            { id: 'A', text: 'Nhiệt năng làm nóng đui đèn' },
            { id: 'B', text: 'Quang năng chiếu sáng mặt bàn' },
            { id: 'C', text: 'Tiếng vo ve nhỏ của chấn lưu' },
            { id: 'D', text: 'Khói bốc ra từ dây dẫn' }
          ],
          answer: 'B',
          hints: ['Mục đích ban đầu của việc bật đèn là để nhìn thấy đồ vật.'],
          explanation: 'Quang năng chiếu sáng là mục đích chính, tức là phần năng lượng có ích.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Tại sao bóng đèn LED lại tiết kiệm điện năng hơn rất nhiều so với bóng đèn dây tóc sợi đốt cũ?',
          options: [
            { id: 'A', text: 'Vì đèn LED dùng pin chứ không dùng điện lưới' },
            { id: 'B', text: 'Vì đèn LED biến hầu hết điện năng thành quang năng, tỏa rất ít nhiệt năng hao phí' },
            { id: 'C', text: 'Vì đèn LED tối hơn đèn sợi đốt' },
            { id: 'D', text: 'Vì đèn LED phát ra tia phóng xạ' }
          ],
          answer: 'B',
          hints: ['Đèn sợi đốt nóng rực làm lãng phí hơn 90% điện năng thành nhiệt.'],
          explanation: 'Đèn sợi đốt làm hao phí tới 90-95% điện năng thành nhiệt, trong khi đèn LED giảm thiểu tối đa hao phí này.'
        },
        {
          level: 'van_dung',
          type: 'numeric',
          prompt: 'Một chiếc quạt điện tiêu thụ 100 J điện năng, trong đó có 85 J được chuyển hóa thành cơ năng làm quay cánh quạt (năng lượng có ích). Phần năng lượng hao phí (chủ yếu là nhiệt nóng mô-tơ) là bao nhiêu Jun (J)?',
          answer: '15',
          tolerance: 0.02,
          unit: 'J',
          hints: ['Năng lượng hao phí = Tổng năng lượng - Năng lượng có ích. Lấy 100 - 85.'],
          explanation: 'Năng lượng hao phí = 100 - 85 = 15 J.'
        },
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Dạng năng lượng hao phí thường xuyên xuất hiện nhất trong quá trình vận hành của các máy móc cơ khí là:',
          options: [
            { id: 'A', text: 'Nhiệt năng sinh ra do lực ma sát' },
            { id: 'B', text: 'Năng lượng hạt nhân' },
            { id: 'C', text: 'Hóa năng giải phóng' },
            { id: 'D', text: 'Quang năng chói sáng' }
          ],
          answer: 'A',
          hints: ['Ma sát giữa các chi tiết chuyển động làm máy móc bị nóng lên.'],
          explanation: 'Nhiệt năng do ma sát giữa các bộ phận chuyển động là nguồn năng lượng hao phí phổ biến nhất.'
        },
        {
          level: 'van_dung',
          type: 'numeric',
          prompt: 'Một máy bơm nước tiêu thụ 500 J điện năng, sinh ra 420 J cơ năng có ích để bơm nước lên bồn chứa. Phần nhiệt năng hao phí tỏa ra làm nóng máy bơm là bao nhiêu Jun (J)?',
          answer: '80',
          tolerance: 0.02,
          unit: 'J',
          hints: ['Lấy tổng điện năng trừ đi cơ năng có ích: 500 - 420.'],
          explanation: 'Nhiệt năng hao phí = 500 - 420 = 80 J.'
        }
      ]
    },
    {
      number: 50,
      title: 'Năng lượng tái tạo',
      objectives: [
        'Phân biệt được nguồn năng lượng tái tạo và nguồn năng lượng không tái tạo (hóa thạch).',
        'Nêu được ưu điểm bảo vệ môi trường của năng lượng mặt trời, gió, sinh khối và thủy điện.'
      ],
      content: `## I. Phân loại nguồn năng lượng
1. **Nguồn năng lượng không tái tạo**:
   - Than đá, dầu mỏ, khí đốt tự nhiên (nhiên liệu hóa thạch).
   - Đặc điểm: Phải mất hàng triệu năm hình thành từ xác sinh vật cổ đại, khai thác sẽ cạn kiệt, khi đốt thải ra nhiều khí nhà kính gây ô nhiễm môi trường và biến đổi khí hậu.
2. **Nguồn năng lượng tái tạo**:
   - Năng lượng Mặt Trời, năng lượng gió, năng lượng nước (thủy điện, sóng biển, thủy triều), năng lượng sinh khối, địa nhiệt.
   - Đặc điểm: Có sẵn trong tự nhiên, liên tục được tái sinh, sạch và thân thiện với môi trường.

## II. Tương lai của năng lượng tái tạo
- Chuyển dịch năng lượng từ than đá sang điện gió ngoài khơi và điện mặt trời là xu thế tất yếu của thế giới để đạt mục tiêu Net Zero (phát thải ròng bằng 0).`,
      keyPoints: [
        'Năng lượng không tái tạo (than đá, dầu mỏ) gây cạn kiệt và ô nhiễm.',
        'Năng lượng tái tạo (mặt trời, gió, nước) vô tận, sạch và bảo vệ môi trường.',
        'Sử dụng năng lượng xanh là giải pháp chống biến đổi khí hậu toàn cầu.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Nguồn năng lượng nào sau đây là NĂNG LƯỢNG TÁI TẠO?',
          options: [
            { id: 'A', text: 'Dầu mỏ thô' },
            { id: 'B', text: 'Than đá mỏ Quảng Ninh' },
            { id: 'C', text: 'Năng lượng gió quay tuabin' },
            { id: 'D', text: 'Khí đốt tự nhiên' }
          ],
          answer: 'C',
          hints: ['Nguồn năng lượng tự nhiên không bao giờ bị dùng cạn kiệt.'],
          explanation: 'Năng lượng gió liên tục được tái sinh từ hoàn lưu khí quyển, là nguồn năng lượng tái tạo sạch.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Nhược điểm lớn nhất của việc khai thác và đốt nhiên liệu hóa thạch (than đá, dầu mỏ) là gì?',
          options: [
            { id: 'A', text: 'Tạo ra quá ít năng lượng' },
            { id: 'B', text: 'Thải ra khí độc và khí CO2 gây hiệu ứng nhà kính làm Trái Đất nóng lên' },
            { id: 'C', text: 'Khó khăn khi lưu trữ trong bình' },
            { id: 'D', text: 'Làm giảm trọng lượng của Trái Đất' }
          ],
          answer: 'B',
          hints: ['Khí CO2 giữ nhiệt trong bầu khí quyển gây biến đổi khí hậu.'],
          explanation: 'Đốt nhiên liệu hóa thạch thải CO2 và bụi mịn, là nguyên nhân chính gây nóng lên toàn cầu.'
        },
        {
          level: 'van_dung',
          type: 'mcq',
          prompt: 'Một vùng hải đảo xa xôi nhiều nắng gió quanh năm nhưng thiếu thốn đường dây điện kéo từ đất liền ra. Giải pháp cung cấp điện bền vững và tiết kiệm nhất cho đảo là gì?',
          options: [
            { id: 'A', text: 'Chở dầu hỏa ra đốt lò hơi suốt ngày đêm' },
            { id: 'B', text: 'Xây dựng hệ thống kết hợp điện mặt trời và tuabin gió kèm bộ lưu trữ ắc quy' },
            { id: 'C', text: 'Chặt hết cây trên đảo để đốt củi' },
            { id: 'D', text: 'Chỉ dùng nến thắp sáng ban đêm' }
          ],
          answer: 'B',
          hints: ['Tận dụng tiềm năng tự nhiên sẵn có của hải đảo (nắng và gió biển).'],
          explanation: 'Hệ thống điện gió kết hợp điện mặt trời tận dụng tối đa tài nguyên thiên nhiên của hải đảo.'
        },
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Nhóm nhiên liệu hóa thạch không thể tái tạo bao gồm:',
          options: [
            { id: 'A', text: 'Than đá, dầu mỏ và khí đốt tự nhiên' },
            { id: 'B', text: 'Nước mưa, gió và ánh sáng mặt trời' },
            { id: 'C', text: 'Cây cỏ, củi khô và rơm rạ' },
            { id: 'D', text: 'Sóng biển và thủy triều' }
          ],
          answer: 'A',
          hints: ['Nhiên liệu hóa thạch hình thành từ xác sinh vật chôn vùi hàng triệu năm trong lòng đất.'],
          explanation: 'Than đá, dầu mỏ và khí đốt là các nhiên liệu hóa thạch truyền thống không thể tái tạo.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Vì sao Việt Nam được đánh giá là quốc gia có tiềm năng to lớn để phát triển năng lượng điện mặt trời và điện gió?',
          options: [
            { id: 'A', text: 'Vì Việt Nam có đường bờ biển dài trên 3260 km nhiều gió và nằm trong vùng nhiệt đới nắng quanh năm' },
            { id: 'B', text: 'Vì Việt Nam có nhiều mỏ than đá nhất thế giới' },
            { id: 'C', text: 'Vì mùa đông Việt Nam rất lạnh' },
            { id: 'D', text: 'Vì nước ta không có đồi núi' }
          ],
          answer: 'A',
          hints: ['Vị trí địa lý ven biển nhiệt đới gió mùa có số giờ nắng cao và tốc độ gió biển lý tưởng.'],
          explanation: 'Bờ biển dài và lượng bức xạ mặt trời dồi dào là lợi thế thiên nhiên vượt trội của Việt Nam.'
        }
      ]
    },
    {
      number: 51,
      title: 'Tiết kiệm năng lượng',
      objectives: [
        'Nêu được sự cần thiết phải tiết kiệm năng lượng trong gia đình và xã hội.',
        'Đề xuất được các hành động cụ thể hàng ngày để tiết kiệm điện và nhiên liệu.'
      ],
      content: `## I. Vì sao phải tiết kiệm năng lượng?
- Nguồn nhiên liệu hóa thạch của nhân loại đang dần cạn kiệt.
- Tiết kiệm năng lượng giúp:
  - Giảm chi phí tiền điện, tiền xăng cho gia đình.
  - Giảm áp lực lên hệ thống lưới điện quốc gia.
  - Giảm phát thải khí ô nhiễm bảo vệ môi trường sống trong lành.

## II. Các biện pháp tiết kiệm năng lượng thiết thực
1. **Trong gia đình**:
   - Tắt đèn, quạt, tivi khi ra khỏi phòng ("Rời phòng nhớ tắt điện").
   - Đặt nhiệt độ điều hòa hợp lý (từ $26^\\circ\\text{C}$ đến $28^\\circ\\text{C}$).
   - Tận dụng tối đa ánh sáng mặt trời và gió tự nhiên ban ngày.
   - Sử dụng các thiết bị dán nhãn năng lượng 5 sao hiệu suất cao.
2. **Khi tham gia giao thông**:
   - Ưu tiên đi bộ, đi xe đạp hoặc sử dụng xe buýt công cộng, tàu điện trên cao.
   - Đi chung xe, không phóng nhanh phanh gấp để tiết kiệm xăng.`,
      keyPoints: [
        'Tiết kiệm năng lượng giúp giảm chi phí sinh hoạt và bảo vệ khí hậu toàn cầu.',
        'Quy tắc vàng: Tắt thiết bị khi không dùng, đặt điều hòa từ 26°C trở lên.',
        'Ưu tiên phương tiện giao thông xanh: đi bộ, xe đạp, giao thông công cộng.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Khẩu hiệu nào sau đây thể hiện rõ nhất ý thức tiết kiệm điện trong trường học và gia đình?',
          options: [
            { id: 'A', text: 'Bật hết đèn cho sáng rực rỡ suốt ngày đêm' },
            { id: 'B', text: 'Tắt đèn, quạt khi rời khỏi phòng' },
            { id: 'C', text: 'Mở cửa sổ khi đang bật điều hòa ở mức 16 độ C' },
            { id: 'D', text: 'Cắm sạc điện thoại liên tục 24/24' }
          ],
          answer: 'B',
          hints: ['Hành động đơn giản ngăn lãng phí điện năng khi không có người sử dụng.'],
          explanation: 'Tắt các thiết bị khi không sử dụng là hành động căn bản nhất để tiết kiệm điện.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Vào mùa hè nóng bức, cài đặt nhiệt độ máy điều hòa không khí ở mức nào dưới đây vừa đảm bảo sức khỏe vừa tiết kiệm điện năng nhất?',
          options: [
            { id: 'A', text: '16°C đến 18°C' },
            { id: 'B', text: '26°C đến 28°C kết hợp bật quạt gió nhẹ' },
            { id: 'C', text: '10°C' },
            { id: 'D', text: '35°C' }
          ],
          answer: 'B',
          hints: ['Mức chênh lệch nhiệt độ với ngoài trời không quá 8-10 độ để tránh sốc nhiệt.'],
          explanation: 'Mức 26-28°C kết hợp quạt thoang thoảng tạo cảm giác mát mẻ dễ chịu và tiết kiệm nhiều điện năng.'
        },
        {
          level: 'van_dung',
          type: 'numeric',
          prompt: 'Một lớp học có 6 bóng đèn, mỗi bóng công suất 40 W. Nếu cả lớp có ý thức tắt tất cả các bóng đèn trong 2 giờ ra chơi mỗi ngày, lượng điện năng tiết kiệm được mỗi ngày là bao nhiêu Oát giờ (Wh)?',
          answer: '480',
          tolerance: 0.02,
          unit: 'Wh',
          hints: ['Tổng công suất = 6 * 40 = 240 W. Điện năng = Công suất * Thời gian (240 * 2).'],
          explanation: 'Tổng công suất 6 bóng = 240 W. Điện năng tiết kiệm = 240 W * 2 h = 480 Wh.'
        },
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Nhãn năng lượng dán trên các thiết bị gia dụng (tủ lạnh, máy giặt, điều hòa) có bao nhiêu ngôi sao là mức tiết kiệm điện năng cao nhất?',
          options: [
            { id: 'A', text: '1 sao' },
            { id: 'B', text: '3 sao' },
            { id: 'C', text: '5 sao' },
            { id: 'D', text: '10 sao' }
          ],
          answer: 'C',
          hints: ['Mức cao nhất của nhãn chứng nhận Bộ Công thương là 5 sao đỏ.'],
          explanation: 'Nhãn năng lượng 5 sao là mức đánh giá thiết bị đạt hiệu suất năng lượng cao nhất, tiết kiệm điện nhất.'
        },
        {
          level: 'van_dung',
          type: 'numeric',
          prompt: 'Gia đình bạn An duy trì thói quen tắt tivi khi không xem giúp tiết kiệm 0.5 kWh điện mỗi ngày. Trong 30 ngày của một tháng, gia đình An đã tiết kiệm được bao nhiêu kWh điện năng?',
          answer: '15',
          tolerance: 0.02,
          unit: 'kWh',
          hints: ['Lấy 0.5 nhân với 30 ngày: 0.5 * 30.'],
          explanation: 'Điện năng tiết kiệm trong 30 ngày = 0.5 * 30 = 15 kWh.'
        }
      ]
    }
  ]
};
