import type { TextbookChapterSeed } from '../textbook';

export const CHAPTER_8: TextbookChapterSeed = {
  number: 8,
  roman: 'VIII',
  title: 'Lực trong đời sống',
  description: 'Khám phá khái niệm lực, cách biểu diễn lực bằng mũi tên, biến dạng đàn hồi của lò xo, trọng lực, lực ma sát và lực cản.',
  lessons: [
    {
      number: 40,
      title: 'Lực là gì?',
      objectives: [
        'Nêu được tác dụng đẩy, kéo của vật này lên vật khác gọi là lực.',
        'Nhận biết được hai tác dụng chính của lực: làm biến đổi chuyển động và làm biến dạng vật.',
        'Nêu được đơn vị đo lực là Niutơn (N).'
      ],
      content: `## I. Khái niệm về lực
- Tác dụng **đẩy** hoặc **kéo** của vật này lên vật khác được gọi là **lực**.
- Kí hiệu lực: $F$.
- Đơn vị đo lực trong hệ SI là **Niutơn** (kí hiệu: $\\text{N}$, đặt theo tên nhà bác học Isaac Newton).
- Dụng cụ đo lực là **lực kế**.

## II. Tác dụng của lực
Lực tác dụng lên một vật có thể gây ra hai kết quả:
1. **Làm biến đổi chuyển động của vật**:
   - Làm vật đang đứng yên bắt đầu chuyển động (cầu thủ sút bóng).
   - Làm vật đang chuyển động chuyển động nhanh lên hoặc chậm lại (bóp phanh xe).
   - Làm vật đổi hướng chuyển động (vợt đập đổi hướng quả bóng bàn).
2. **Làm biến dạng vật**:
   - Làm vật thay đổi hình dạng, kích thước (kéo dãn lò xo, nặn đất sét, bóp bẹp vỏ lon).`,
      keyPoints: [
        'Lực là tác dụng đẩy hoặc kéo của vật này lên vật khác.',
        'Đơn vị đo lực là Niutơn (N), dụng cụ đo là lực kế.',
        'Lực làm vật biến đổi chuyển động (nhanh lên, chậm lại, đổi hướng) hoặc làm vật biến dạng.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Đơn vị đo lực trong hệ đo lường quốc tế SI là gì?',
          options: [
            { id: 'A', text: 'Kilôgam (kg)' },
            { id: 'B', text: 'Niutơn (N)' },
            { id: 'C', text: 'Mét (m)' },
            { id: 'D', text: 'Paxcan (Pa)' }
          ],
          answer: 'B',
          hints: ['Đơn vị này được đặt theo tên của nhà bác học tìm ra định luật vạn vật hấp dẫn.'],
          explanation: 'Niutơn (N) là đơn vị đo lực chuẩn theo hệ SI.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Hành động nào sau đây là ví dụ về lực vừa làm BIẾN ĐỔI CHUYỂN ĐỘNG vừa làm BIẾN DẠNG vật?',
          options: [
            { id: 'A', text: 'Cầu thủ đá mạnh vào quả bóng làm quả bóng lõm vào và bay vút đi' },
            { id: 'B', text: 'Gió nhẹ thổi lá vàng rơi đều trong không trung' },
            { id: 'C', text: 'Quyển sách nằm yên tĩnh trên mặt bàn nằm ngang' },
            { id: 'D', text: 'Treo áo lên móc quần áo' }
          ],
          answer: 'A',
          hints: ['Quả bóng vừa bị lõm (biến dạng) vừa bay đi (biến đổi chuyển động).'],
          explanation: 'Cú đá của cầu thủ làm bóng bị móp lõm (biến dạng) và tăng tốc bay đi (biến đổi chuyển động).'
        },
        {
          level: 'van_dung',
          type: 'numeric',
          prompt: 'Một lực kế lò xo có giới hạn đo 10 N, trên bảng chia độ từ 0 N đến 10 N có tất cả 50 khoảng chia đều nhau. Độ chia nhỏ nhất (ĐCNN) của lực kế này là bao nhiêu Niutơn (N)?',
          answer: '0.2',
          tolerance: 0.02,
          unit: 'N',
          hints: ['Lấy giới hạn đo 10 N chia cho 50 khoảng chia nhỏ.'],
          explanation: 'ĐCNN = 10 / 50 = 0.2 N.'
        }
      ]
    },
    {
      number: 41,
      title: 'Biểu diễn lực',
      objectives: [
        'Nêu được các yếu tố của lực: điểm đặt, phương, chiều và độ lớn.',
        'Biết cách biểu diễn lực bằng một mũi tên có gốc, hướng và độ dài theo tỉ xích.'
      ],
      content: `## I. Các yếu tố của lực
Lực là một đại lượng véctơ, được đặc trưng bởi 4 yếu tố:
1. **Điểm đặt**: Vị trí mà lực tác dụng trực tiếp lên vật.
2. **Phương**: Đường thẳng dọc theo tác dụng của lực (phương thẳng đứng, phương nằm ngang, phương xiên).
3. **Chiều**: Hướng của tác dụng lực (từ trái sang phải, từ dưới lên trên...).
4. **Độ lớn**: Cường độ mạnh hay yếu của lực, đo bằng đơn vị Niutơn ($\\text{N}$).

## II. Cách biểu diễn lực bằng mũi tên
Một lực được biểu diễn bằng một mũi tên có:
- **Gốc** của mũi tên: Đặt tại điểm mà lực tác dụng lên vật.
- **Hướng** của mũi tên (phương và chiều): Cùng phương và chiều với lực.
- **Độ dài** của mũi tên: Biểu thị độ lớn của lực theo một **tỉ xích** quy ước (ví dụ: $1\\text{ cm}$ ứng với $5\\text{ N}$).`,
      keyPoints: [
        'Lực có 4 yếu tố: điểm đặt, phương, chiều và độ lớn.',
        'Lực được biểu diễn bằng một mũi tên có gốc tại điểm đặt, hướng theo chiều lực và độ dài theo tỉ xích.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Khi biểu diễn một lực bằng mũi tên, độ dài của mũi tên biểu thị cho yếu tố nào của lực?',
          options: [
            { id: 'A', text: 'Điểm đặt của lực' },
            { id: 'B', text: 'Độ lớn của lực theo tỉ xích quy ước' },
            { id: 'C', text: 'Phương của lực' },
            { id: 'D', text: 'Thời gian tác dụng lực' }
          ],
          answer: 'B',
          hints: ['Mũi tên càng dài thì lực càng mạnh.'],
          explanation: 'Độ dài của mũi tên tỉ lệ thuận với độ lớn của lực theo một tỉ xích chọn trước.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Một lực kéo có độ lớn 15 N tác dụng lên một chiếc xe đẩy theo phương nằm ngang từ trái sang phải. Nếu chọn tỉ xích 1 cm ứng với 5 N, thì mũi tên biểu diễn lực có độ dài là bao nhiêu?',
          options: [
            { id: 'A', text: '1.5 cm' },
            { id: 'B', text: '3 cm' },
            { id: 'C', text: '5 cm' },
            { id: 'D', text: '15 cm' }
          ],
          answer: 'B',
          hints: ['Mỗi 1 cm biểu thị 5 N. Lấy 15 chia cho 5.'],
          explanation: 'Độ dài mũi tên = 15 N / (5 N/cm) = 3 cm.'
        },
        {
          level: 'van_dung',
          type: 'numeric',
          prompt: 'Trên hình vẽ, một mũi tên biểu diễn lực dài 4.5 cm, biết tỉ xích quy ước được ghi chú là 1 cm ứng với 20 N. Độ lớn của lực được biểu diễn là bao nhiêu Niutơn (N)?',
          answer: '90',
          tolerance: 0.02,
          unit: 'N',
          hints: ['Nhân độ dài 4.5 cm với 20 N/cm.'],
          explanation: 'Độ lớn của lực = 4.5 * 20 = 90 N.'
        }
      ]
    },
    {
      number: 42,
      title: 'Biến dạng của lò xo',
      objectives: [
        'Nêu được tính chất biến dạng đàn hồi của lò xo.',
        'Tính được độ dãn của lò xo: Delta_l = l - l0.',
        'Rút ra được mối quan hệ: Độ dãn của lò xo tỉ lệ thuận với khối lượng vật treo.'
      ],
      content: `## I. Biến dạng đàn hồi của lò xo
- Khi dùng tay kéo hoặc treo vật nặng, lò xo bị dãn dài ra. Khi thôi tác dụng lực, lò xo tự trở về chiều dài ban đầu.
- Biến dạng như vậy được gọi là **biến dạng đàn hồi**, và lò xo là vật có tính đàn hồi.
- Chiều dài tự nhiên ban đầu của lò xo khi chưa treo vật: kí hiệu $l_0$.
- Chiều dài của lò xo khi đã treo vật: kí hiệu $l$.

## II. Độ dãn của lò xo
- Độ dãn (độ biến dạng) của lò xo được tính bằng:
$$\\Delta l = l - l_0$$
Trong đó:
- $l_0$ là chiều dài tự nhiên ban đầu.
- $l$ là chiều dài khi dãn.
- $\\Delta l$ là độ biến dạng (độ dãn) của lò xo.

## III. Đặc điểm độ dãn lò xo
- Trong giới hạn đàn hồi, **độ dãn của lò xo treo thẳng đứng tỉ lệ thuận với khối lượng vật treo** (hoặc lực kéo).
- Treo vật nặng gấp đôi $\\rightarrow$ lò xo dãn gấp đôi.
- Đây chính là nguyên lý cấu tạo của chiếc **lực kế lò xo**!`,
      keyPoints: [
        'Lò xo có tính đàn hồi, tự trở lại hình dạng ban đầu khi thôi lực kéo.',
        'Độ dãn lò xo: Delta_l = l - l0.',
        'Độ dãn của lò xo tỉ lệ thuận với khối lượng vật treo trong giới hạn đàn hồi.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Vật nào sau đây có tính chất biến dạng đàn hồi giống như chiếc lò xo?',
          options: [
            { id: 'A', text: 'Cục đất sét nặn đồ chơi' },
            { id: 'B', text: 'Sợi dây cao su kéo co dãn' },
            { id: 'C', text: 'Mẩu phấn viết bảng' },
            { id: 'D', text: 'Tờ giấy gấp hình chiếc thuyền' }
          ],
          answer: 'B',
          hints: ['Khi kéo dãn sợi dây cao su rồi buông tay, nó tự co về hình dạng cũ.'],
          explanation: 'Dây cao su có tính đàn hồi, tự phục hồi hình dạng ban đầu khi ngừng lực kéo.'
        },
        {
          level: 'thong_hieu',
          type: 'numeric',
          prompt: 'Một lò xo có chiều dài tự nhiên l0 = 10 cm. Khi treo một quả cân vào đầu dưới lò xo, chiều dài của lò xo đo được là l = 14 cm. Độ dãn Delta_l của lò xo là bao nhiêu cm?',
          answer: '4',
          tolerance: 0.02,
          unit: 'cm',
          hints: ['Áp dụng công thức Delta_l = l - l0: lấy 14 - 10.'],
          explanation: 'Độ dãn của lò xo: Delta_l = l - l0 = 14 - 10 = 4 cm.'
        },
        {
          level: 'van_dung',
          type: 'numeric',
          prompt: 'Treo một quả cân nặng 50 g thì lò xo dãn ra 1.5 cm. Nếu treo thêm một quả cân nặng 100 g nữa (tổng khối lượng treo là 150 g) thì độ dãn tổng cộng của lò xo là bao nhiêu cm (coi chưa vượt quá giới hạn đàn hồi)?',
          answer: '4.5',
          tolerance: 0.02,
          unit: 'cm',
          hints: ['Khối lượng 150 g gấp 3 lần khối lượng 50 g, nên độ dãn cũng tăng gấp 3 lần.'],
          explanation: 'Khối lượng tăng gấp 3 (150/50 = 3), do độ dãn tỉ lệ thuận với khối lượng nên độ dãn mới = 1.5 * 3 = 4.5 cm.'
        }
      ]
    },
    {
      number: 43,
      title: 'Trọng lượng, lực hấp dẫn',
      objectives: [
        'Nêu được lực hấp dẫn là lực hút giữa mọi vật có khối lượng trong vũ trụ.',
        'Hiểu trọng lượng là độ lớn của lực hút Trái Đất tác dụng lên vật.',
        'Vận dụng mối liên hệ giữa trọng lượng P và khối lượng m: P = 10.m.'
      ],
      content: `## I. Lực hấp dẫn và Trọng lực
- Mọi vật có khối lượng trong vũ trụ đều hút nhau bằng một lực gọi là **lực hấp dẫn**.
- **Trọng lực**: Là lực hút của Trái Đất tác dụng lên các vật thể quanh nó.
  - Phương của trọng lực: **Phương thẳng đứng**.
  - Chiều của trọng lực: **Hướng từ trên xuống dưới** (hướng về tâm Trái Đất).
- **Trọng lượng**: Là độ lớn của trọng lực tác dụng lên vật, kí hiệu là $P$, đo bằng đơn vị Niutơn ($\\text{N}$).

## II. Mối liên hệ giữa Trọng lượng và Khối lượng
- Khối lượng $m$ càng lớn thì trọng lượng $P$ của vật càng lớn.
- Ở bề mặt Trái Đất, mối liên hệ gần đúng giữa trọng lượng và khối lượng là:
$$P = 10 \\cdot m$$
Trong đó:
- $m$ là khối lượng của vật (đơn vị bắt buộc là **kilôgam**, $\\text{kg}$).
- $P$ là trọng lượng của vật (đơn vị: **Niutơn**, $\\text{N}$).
- Hệ số $10$ xấp xỉ gia tốc trọng trường $g \\approx 9.8\\text{ m/s}^2$.`,
      keyPoints: [
        'Trọng lực là lực hút của Trái Đất, có phương thẳng đứng, chiều hướng về tâm Trái Đất.',
        'Trọng lượng P là độ lớn của trọng lực, tính bằng công thức: P = 10 * m (với m tính bằng kg).'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Trọng lực tác dụng lên một vật thể trên Trái Đất có phương và chiều như thế nào?',
          options: [
            { id: 'A', text: 'Phương nằm ngang, chiều từ trái sang phải' },
            { id: 'B', text: 'Phương thẳng đứng, chiều hướng từ trên xuống dưới' },
            { id: 'C', text: 'Phương xiên góc 45 độ hướng lên trời' },
            { id: 'D', text: 'Phương thẳng đứng, chiều hướng từ dưới lên trên' }
          ],
          answer: 'B',
          hints: ['Vật rơi tự do theo phương nào và hướng về đâu?'],
          explanation: 'Trọng lực có phương thẳng đứng và chiều hướng về phía tâm Trái Đất (từ trên xuống dưới).'
        },
        {
          level: 'thong_hieu',
          type: 'numeric',
          prompt: 'Một bao gạo có khối lượng m = 5 kg. Trọng lượng P của bao gạo này trên mặt đất là bao nhiêu Niutơn (N)?',
          answer: '50',
          tolerance: 0.02,
          unit: 'N',
          hints: ['Áp dụng công thức P = 10 * m với m = 5 kg.'],
          explanation: 'Trọng lượng P = 10 * m = 10 * 5 = 50 N.'
        },
        {
          level: 'van_dung',
          type: 'numeric',
          prompt: 'Một chiếc bàn học có trọng lượng P = 180 N. Khối lượng m của chiếc bàn học đó tính theo đơn vị kilôgam (kg) là bao nhiêu?',
          answer: '18',
          tolerance: 0.02,
          unit: 'kg',
          hints: ['Từ công thức P = 10 * m, suy ra m = P / 10. Lấy 180 chia cho 10.'],
          explanation: 'Khối lượng m = P / 10 = 180 / 10 = 18 kg.'
        }
      ]
    },
    {
      number: 44,
      title: 'Lực ma sát',
      objectives: [
        'Nhận biết được lực ma sát trượt và ma sát nghỉ ở bề mặt tiếp xúc.',
        'Phân tích được tác dụng có lợi và tác dụng có hại của lực ma sát trong thực tiễn.',
        'Nêu được các biện pháp tăng ma sát có lợi và giảm ma sát có hại.'
      ],
      content: `## I. Lực ma sát là gì?
- **Lực ma sát** là lực cản trở chuyển động xuất hiện ở bề mặt tiếp xúc giữa hai vật:
  - **Lực ma sát trượt**: Xuất hiện khi một vật trượt trên bề mặt của vật khác (kéo bao tải trượt trên sàn, má phanh cọ vào bánh xe).
  - **Lực ma sát nghỉ**: Giữ cho vật đứng yên khi có lực kéo/đẩy nhẹ tác dụng lên vật (giúp chân ta bám đất để bước đi).

## II. Tác dụng của ma sát trong đời sống
- **Ma sát có lợi**:
  - Giúp xe cộ phanh dừng lại kịp thời.
  - Giúp tay cầm nắm đồ vật không bị tuột trơn.
  - Giúp que diêm cọ xát bốc cháy.
  - *Cách tăng*: Khía rãnh gai trên lốp xe, rải cát trên đường trơn, đeo găng tay cao su.
- **Ma sát có hại**:
  - Làm mòn lốp xe, mòn xích đĩa xe đạp.
  - Làm nóng ổ trục máy móc, tiêu hao năng lượng.
  - *Cách giảm*: Tra dầu mỡ bôi trơn, dùng vòng bi (chuyển ma sát trượt thành ma sát lăn), làm nhẵn bề mặt.`,
      keyPoints: [
        'Ma sát xuất hiện ở mặt tiếp xúc, cản trở chuyển động.',
        'Ma sát trượt sinh ra khi vật trượt; ma sát nghỉ giữ vật đứng yên bám dính.',
        'Tăng ma sát có lợi bằng khía rãnh gai; giảm ma sát có hại bằng tra dầu mỡ, gắn vòng bi con lăn.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Lực ma sát trượt xuất hiện trong trường hợp nào dưới đây?',
          options: [
            { id: 'A', text: 'Quyển sách nằm yên trên mặt bàn nằm ngang' },
            { id: 'B', text: 'Chiếc gôm tẩy trượt trên mặt trang giấy để xóa nét chì' },
            { id: 'C', text: 'Quả bóng đang bay lơ lửng trên không trung' },
            { id: 'D', text: 'Viên đá lạnh nổi trên mặt nước' }
          ],
          answer: 'B',
          hints: ['Có sự trượt tiếp xúc giữa 2 bề mặt rắn.'],
          explanation: 'Gôm tẩy trượt trên mặt giấy làm xuất hiện lực ma sát trượt.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Tại sao lốp xe đạp, xe máy luôn được đúc các đường khía rãnh và gai cao su sâu?',
          options: [
            { id: 'A', text: 'Để giảm bớt lượng cao su khi sản xuất' },
            { id: 'B', text: 'Để tăng lực ma sát giúp xe bám đường tốt, chống trơn trượt' },
            { id: 'C', text: 'Để làm xe chạy chậm lại khi đi học' },
            { id: 'D', text: 'Để trang trí cho bánh xe đổi màu' }
          ],
          answer: 'B',
          hints: ['Mặt lốp gồ ghề làm tăng diện tích bám và độ ma sát.'],
          explanation: 'Rãnh gai làm tăng lực ma sát giữa lốp xe và mặt đường, tránh tai nạn trơn trượt khi phanh.'
        },
        {
          level: 'van_dung',
          type: 'mcq',
          prompt: 'Để giảm ma sát có hại trong ổ trục bánh xe đạp giúp đạp xe nhẹ nhàng, biện pháp nào sau đây là hiệu quả nhất?',
          options: [
            { id: 'A', text: 'Rắc thêm cát mịn vào bên trong ổ trục' },
            { id: 'B', text: 'Lắp vòng bi (ổ bi) và tra dầu mỡ bôi trơn định kỳ' },
            { id: 'C', text: 'Rửa ổ trục bằng nước muối' },
            { id: 'D', text: 'Bơm căng lốp xe đến mức tối đa' }
          ],
          answer: 'B',
          hints: ['Vòng bi biến ma sát trượt thành ma sát lăn, dầu mỡ giảm tiếp xúc khô.'],
          explanation: 'Vòng bi và dầu mỡ bôi trơn là giải pháp chuẩn mực để giảm ma sát trong cơ khí.'
        }
      ]
    },
    {
      number: 45,
      title: 'Lực cản của nước và không khí',
      objectives: [
        'Nêu được vật chuyển động trong chất lưu (chất lỏng, chất khí) luôn chịu lực cản.',
        'Hiểu lực cản phụ thuộc vào hình dạng khí động học của vật thể.',
        'Liên hệ hình dạng thuôn nhọn của cá, chim, máy bay và tàu ngầm.'
      ],
      content: `## I. Lực cản của chất lưu
- Khi một vật chuyển động trong **nước** hoặc trong **không khí**, luôn chịu một lực cản của môi trường ngược chiều chuyển động.
- Nước có mật độ hạt lớn hơn không khí nên lực cản của nước lớn hơn lực cản của không khí rất nhiều lần (đi bộ dưới nước khó hơn nhiều so với đi trên bờ).

## II. Hình dạng và lực cản
- Lực cản của chất lưu phụ thuộc lớn vào **hình dạng** và **diện tích cản gió/nước** của vật:
  - Vật có tiết diện cản lớn $\\rightarrow$ Lực cản lớn (ví dụ: chiếc dù nhảy mở to để cản không khí giúp phi công hạ cánh an toàn).
  - Vật có hình dạng **thuôn nhọn khí động học** $\\rightarrow$ Lực cản nhỏ (ví dụ: đầu cá heo, đầu chim bồ câu, đầu tàu hỏa cao tốc Shinkansen, mũi tên).`,
      keyPoints: [
        'Vật chuyển động trong nước và không khí đều chịu lực cản ngược chiều chuyển động.',
        'Lực cản của nước lớn hơn lực cản của không khí.',
        'Hình dạng khí động học thuôn nhọn giúp giảm thiểu lực cản của môi trường.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Thiết bị nào sau đây tận dụng LỰC CẢN LỚN CỦA KHÔNG KHÍ để hoạt động an toàn?',
          options: [
            { id: 'A', text: 'Chiếc dù cứu hộ của lính nhảy dù' },
            { id: 'B', text: 'Chiếc tên lửa đẩy bay vào vũ trụ' },
            { id: 'C', text: 'Mũi thuyền buồm' },
            { id: 'D', text: 'Mũi khoan bê tông' }
          ],
          answer: 'A',
          hints: ['Thiết bị này xòe rộng để hứng không khí, làm giảm tốc độ rơi.'],
          explanation: 'Dù cứu hộ xòe diện tích lớn hứng không khí, tạo lực cản khổng lồ hãm tốc độ rơi an toàn.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Tại sao đầu của loài chim bồ câu và phần mũi của máy bay phản lực đều có dạng thuôn nhọn về phía trước?',
          options: [
            { id: 'A', text: 'Để làm đẹp mắt cho hành khách ngắm' },
            { id: 'B', text: 'Để giảm thiểu lực cản của không khí khi bay tốc độ cao' },
            { id: 'C', text: 'Để tăng trọng lượng của máy bay' },
            { id: 'D', text: 'Để hứng được nhiều luồng gió mát vào khoang' }
          ],
          answer: 'B',
          hints: ['Hình dạng khí động học giúp xé gió dễ dàng.'],
          explanation: 'Dạng thuôn nhọn (khí động học) giúp luồng không khí lướt mượt mà quanh thân, giảm lực cản.'
        },
        {
          level: 'van_dung',
          type: 'mcq',
          prompt: 'Hai người bơi đua cùng thể lực và kỹ thuật bơi. Người A mặc bộ đồ bơi ôm sát trơn láng và đội mũ bơi thuôn đầu, người B mặc quần áo rộng thùng thình. Ai sẽ có lợi thế bơi nhanh hơn? Vì sao?',
          options: [
            { id: 'A', text: 'Người B nhanh hơn vì quần áo rộng chứa nhiều nước' },
            { id: 'B', text: 'Người A nhanh hơn vì đồ bơi trơn ôm sát làm giảm lực cản của nước' },
            { id: 'C', text: 'Hai người bằng nhau vì nước không cản trở người bơi' },
            { id: 'D', text: 'Người B nhanh hơn vì nổi tốt hơn' }
          ],
          answer: 'B',
          hints: ['Diện tích cản và bề mặt trơn làm giảm ma sát nhớt trong nước.'],
          explanation: 'Đồ bơi ôm sát làm giảm diện tích cản và ma sát với nước, giúp người A bơi nhanh hơn.'
        }
      ]
    }
  ]
};
