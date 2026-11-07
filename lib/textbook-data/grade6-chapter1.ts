import type { TextbookChapterSeed } from '../textbook';

export const CHAPTER_1: TextbookChapterSeed = {
  number: 1,
  roman: 'I',
  title: 'Mở đầu về KHTN & Các phép đo cơ bản',
  description: 'Tìm hiểu các dụng cụ đo lường độ dài, khối lượng, thời gian, nhiệt độ và rèn luyện kỹ năng thực hành.',
  lessons: [
    {
      number: 5,
      title: 'Đo chiều dài',
      objectives: [
        'Nêu được đơn vị đo chiều dài trong hệ SI là mét (m) và các ước số, bội số thường dùng.',
        'Xác định được giới hạn đo (GHĐ) và độ chia nhỏ nhất (ĐCNN) của thước.',
        'Vận dụng quy trình 5 bước đo chiều dài chính xác để tránh sai số.'
      ],
      content: `## I. Đơn vị và dụng cụ đo chiều dài
- Trong hệ đo lường quốc tế (SI), đơn vị đo chiều dài là **mét** (kí hiệu: $\\text{m}$).
- Các đơn vị khác thường gặp:
  - Milimét ($\\text{mm}$): $1\\text{ mm} = 0.001\\text{ m}$.
  - Xentimét ($\\text{cm}$): $1\\text{ cm} = 0.01\\text{ m}$.
  - Đềximét ($\\text{dm}$): $1\\text{ dm} = 0.1\\text{ m}$.
  - Kilômét ($\\text{km}$): $1\\text{ km} = 1000\\text{ m}$.
- Dụng cụ đo: Thước kẻ, thước cuộn, thước dây, thước kẹp.
  - **Giới hạn đo (GHĐ)**: Độ dài lớn nhất ghi trên thước.
  - **Độ chia nhỏ nhất (ĐCNN)**: Độ dài giữa hai vạch chia liên tiếp trên thước.

## II. Quy trình 5 bước đo chiều dài
1. **Ước lượng** độ dài cần đo để chọn thước có GHĐ và ĐCNN thích hợp.
2. **Đặt thước** dọc theo chiều dài cần đo, vạch số $0$ ngang bằng với một đầu của vật.
3. **Đặt mắt** nhìn theo hướng vuông góc với cạnh thước tại đầu kia của vật.
4. **Đọc giá trị** theo vạch chia gần nhất với đầu kia của vật.
5. **Ghi kết quả** đo kèm theo đơn vị đo thích hợp.`,
      keyPoints: [
        'Đơn vị chuẩn đo chiều dài là mét (m).',
        'GHĐ là giá trị lớn nhất ghi trên thước; ĐCNN là khoảng cách giữa 2 vạch chia liên tiếp.',
        'Khi đo, phải đặt mắt vuông góc với cạnh thước tại vạch cần đọc.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Giới hạn đo (GHĐ) của một chiếc thước được định nghĩa là gì?',
          options: [
            { id: 'A', text: 'Độ dài nhỏ nhất mà thước có thể đo được' },
            { id: 'B', text: 'Độ dài lớn nhất ghi trên thước' },
            { id: 'C', text: 'Khoảng cách giữa hai vạch chia liên tiếp trên thước' },
            { id: 'D', text: 'Chiều dày của chiếc thước' }
          ],
          answer: 'B',
          hints: ['Hãy chú ý từ "Giới hạn" và "Lớn nhất".'],
          explanation: 'Giới hạn đo (GHĐ) của thước là độ dài lớn nhất được in trên thước.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Một chiếc thước kẻ có vạch số 0 và vạch cuối là 20 cm. Giữa vạch 0 cm và 1 cm được chia đều thành 10 khoảng nhỏ. ĐCNN của thước là bao nhiêu?',
          options: [
            { id: 'A', text: '1 mm' },
            { id: 'B', text: '1 cm' },
            { id: 'C', text: '2 mm' },
            { id: 'D', text: '0.5 mm' }
          ],
          answer: 'A',
          hints: ['Đoạn 1 cm = 10 mm chia đều cho 10 khoảng nhỏ.'],
          explanation: 'ĐCNN là độ dài 1 khoảng nhỏ: 1 cm / 10 = 0.1 cm = 1 mm.'
        },
        {
          level: 'van_dung',
          type: 'numeric',
          prompt: 'Để đo chu vi của một chiếc bút chì hình trụ tròn, em dùng sợi chỉ quấn sát nhau 5 vòng quanh thân bút chì, sau đó mở sợi chỉ ra đo được chiều dài 60 mm. Chu vi của chiếc bút chì đó là bao nhiêu mm?',
          answer: '12',
          tolerance: 0.02,
          unit: 'mm',
          hints: ['Tổng chiều dài 5 vòng là 60 mm. Hãy chia cho 5.'],
          explanation: 'Chu vi 1 vòng thân bút chì là: 60 / 5 = 12 mm.'
        }
      ]
    },
    {
      number: 6,
      title: 'Đo khối lượng',
      objectives: [
        'Nêu được đơn vị đo khối lượng trong hệ SI là kilôgam (kg).',
        'Hiểu khối lượng là số đo lượng chất tạo nên vật thể.',
        'Biết cách sử dụng cân đồng hồ và cân điện tử để đo khối lượng.'
      ],
      content: `## I. Khối lượng và đơn vị đo
- **Khối lượng** là số đo lượng chất chứa trong một vật thể.
- Đơn vị đo khối lượng trong hệ SI là **kilôgam** (kí hiệu: $\\text{kg}$).
- Các đơn vị khác:
  - Gam ($\\text{g}$): $1\\text{ g} = 0.001\\text{ kg}$.
  - Miligam ($\\text{mg}$): $1\\text{ mg} = 0.001\\text{ g}$.
  - Tạ: $1\\text{ tạ} = 100\\text{ kg}$.
  - Tấn ($\\text{t}$): $1\\text{ t} = 1000\\text{ kg}$.

## II. Dụng cụ đo khối lượng
- Dụng cụ thường dùng: Cân đòn, cân Rô-béc-van, cân đồng hồ, cân điện tử, cân y tế.
- **Cách dùng cân đồng hồ**:
  1. Điều chỉnh kim chỉ thị về đúng vạch số $0$.
  2. Đặt vật cần cân lên đĩa cân vững vàng.
  3. Đặt mắt nhìn vuông góc với mặt số đồng hồ.
  4. Đọc và ghi kết quả theo vạch chia gần nhất với đầu kim.`,
      keyPoints: [
        'Khối lượng chỉ lượng chất của vật thể, đơn vị chuẩn SI là kilôgam (kg).',
        'Dụng cụ đo khối lượng là cân.',
        'Trước khi cân, cần hiệu chỉnh kim chỉ thị hoặc màn hình hiển thị về vạch số 0.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Đơn vị đo khối lượng chính thức trong hệ đo lường quốc tế SI là gì?',
          options: [
            { id: 'A', text: 'Gam (g)' },
            { id: 'B', text: 'Kilôgam (kg)' },
            { id: 'C', text: 'Tấn (t)' },
            { id: 'D', text: 'Lạng' }
          ],
          answer: 'B',
          hints: ['Đây là đơn vị cơ bản có kí hiệu là kg.'],
          explanation: 'Kilôgam (kg) là đơn vị đo khối lượng chuẩn theo hệ SI.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Trên một hộp sữa bột có ghi dòng chữ "Khối lượng tịnh 900 g". Con số này cho em biết điều gì?',
          options: [
            { id: 'A', text: 'Khối lượng của riêng vỏ hộp sắt' },
            { id: 'B', text: 'Khối lượng của bột sữa chứa bên trong hộp' },
            { id: 'C', text: 'Khối lượng của cả bột sữa và vỏ hộp' },
            { id: 'D', text: 'Thể tích của hộp sữa' }
          ],
          answer: 'B',
          hints: ['"Khối lượng tịnh" có nghĩa là khối lượng của vật chất bên trong, không tính bao bì.'],
          explanation: 'Khối lượng tịnh chỉ lượng chất (bột sữa) chứa trong hộp, không tính vỏ.'
        },
        {
          level: 'van_dung',
          type: 'numeric',
          prompt: 'Một xe tải chở 2.5 tấn hàng hóa và 5 tạ nguyên liệu. Tổng khối lượng hàng hóa và nguyên liệu xe chở tính ra đơn vị kilôgam (kg) là bao nhiêu?',
          answer: '3000',
          tolerance: 0.02,
          unit: 'kg',
          hints: ['Đổi 2.5 tấn = 2500 kg; 5 tạ = 500 kg. Sau đó cộng lại.'],
          explanation: '2.5 tấn = 2500 kg; 5 tạ = 500 kg. Tổng khối lượng = 2500 + 500 = 3000 kg.'
        }
      ]
    },
    {
      number: 7,
      title: 'Đo thời gian',
      objectives: [
        'Nêu được đơn vị đo thời gian trong hệ SI là giây (s).',
        'Lựa chọn đồng hồ đo phù hợp với từng hoạt động.',
        'Sử dụng thành thạo đồng hồ bấm giây để đo thời gian chuyển động.'
      ],
      content: `## I. Đơn vị và dụng cụ đo thời gian
- Đơn vị đo thời gian trong hệ SI là **giây** (kí hiệu: $\\text{s}$).
- Các đơn vị thường gặp khác:
  - Phút ($\\text{min}$): $1\\text{ min} = 60\\text{ s}$.
  - Giờ ($\\text{h}$): $1\\text{ h} = 60\\text{ min} = 3600\\text{ s}$.
  - Ngày, tuần, tháng, năm, thế kỉ.
- Dụng cụ đo: Đồng hồ treo tường, đồng hồ đeo tay, đồng hồ bấm giây điện tử, đồng hồ cát, đồng hồ nước.

## II. Sử dụng đồng hồ bấm giây
- Đồng hồ bấm giây thường dùng để đo khoảng thời gian ngắn (như thời gian chạy cự li 100m, thời gian con lắc dao động).
- Cách sử dụng đồng hồ bấm giây điện tử:
  1. Bấm nút Reset đưa màn hình về $00:00:00$.
  2. Bấm nút Start khi đối tượng bắt đầu chuyển động.
  3. Bấm nút Stop khi đối tượng chạm đích.
  4. Đọc thời gian hiển thị: phút : giây : phần trăm giây.`,
      keyPoints: [
        'Đơn vị đo thời gian chuẩn là giây (s).',
        '1 giờ = 60 phút = 3600 giây.',
        'Đồng hồ bấm giây đo chính xác các khoảng thời gian chuyển động ngắn trong thể thao và thí nghiệm.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Đơn vị đo thời gian cơ bản trong hệ SI là gì?',
          options: [
            { id: 'A', text: 'Giờ (h)' },
            { id: 'B', text: 'Giây (s)' },
            { id: 'C', text: 'Phút (min)' },
            { id: 'D', text: 'Ngày' }
          ],
          answer: 'B',
          hints: ['Kí hiệu quốc tế là s.'],
          explanation: 'Giây (s) là đơn vị chuẩn đo thời gian trong hệ SI.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Để đo thời gian chạy 100 m của học sinh trong tiết thể dục, ta nên chọn loại đồng hồ nào sau đây?',
          options: [
            { id: 'A', text: 'Đồng hồ quả lắc treo tường' },
            { id: 'B', text: 'Đồng hồ bấm giây' },
            { id: 'C', text: 'Đồng hồ cát mini' },
            { id: 'D', text: 'Đồng hồ lịch vạn niên' }
          ],
          answer: 'B',
          hints: ['Đồng hồ này có nút Start/Stop đo chính xác đến phần trăm giây.'],
          explanation: 'Đồng hồ bấm giây có độ chính xác cao (đến 0.01s), thích hợp đo các cự li chạy ngắn.'
        },
        {
          level: 'van_dung',
          type: 'numeric',
          prompt: 'Một tiết học kéo dài 45 phút. Đổi thời gian của tiết học đó ra đơn vị giây (s) là bao nhiêu?',
          answer: '2700',
          tolerance: 0.02,
          unit: 's',
          hints: ['1 phút có 60 giây. Hãy nhân 45 với 60.'],
          explanation: '45 phút = 45 * 60 = 2700 giây.'
        }
      ]
    },
    {
      number: 8,
      title: 'Đo nhiệt độ',
      objectives: [
        'Nêu được nhiệt độ là số đo mức độ nóng, lạnh của một vật thể.',
        'Hiểu nguyên lý hoạt động của nhiệt kế dựa trên sự nở vì nhiệt của chất lỏng.',
        'Biết cách đo nhiệt độ bằng nhiệt kế thủy ngân, nhiệt kế rượu và nhiệt kế điện tử hồng ngoại.'
      ],
      content: `## I. Nhiệt độ và thang nhiệt độ
- **Nhiệt độ** là số đo mức độ "nóng" hay "lạnh" của một vật.
- Thang nhiệt độ Xen-xi-út (Celsius):
  - Kí hiệu: $^\\circ\\text{C}$.
  - Nhiệt độ của nước đá đang tan: $0^\\circ\\text{C}$.
  - Nhiệt độ của nước đang sôi: $100^\\circ\\text{C}$.
  - Thân nhiệt bình thường của con người: khoảng $36.5^\\circ\\text{C} - 37^\\circ\\text{C}$.

## II. Nhiệt kế và nguyên tắc hoạt động
- Nhiệt kế hoạt động dựa trên **sự nở vì nhiệt của chất lỏng** (chất lỏng nở ra khi nóng lên, co lại khi lạnh đi).
- Các loại nhiệt kế:
  - **Nhiệt kế thủy ngân**: Đo nhiệt độ trong phòng thí nghiệm và y tế (cẩn thận vì thủy ngân rất độc nếu vỡ).
  - **Nhiệt kế rượu**: Thường dùng đo nhiệt độ không khí ngoài trời.
  - **Nhiệt kế điện tử / hồng ngoại**: Đo nhanh, an toàn, không tiếp xúc, dùng đo thân nhiệt hiện đại.`,
      keyPoints: [
        'Nhiệt kế đo độ nóng lạnh bằng thang đo độ Celsius (°C).',
        'Nhiệt kế chất lỏng hoạt động dựa trên hiện tượng nở vì nhiệt của chất lỏng.',
        'Nước đá tan ở 0°C, nước sôi ở 100°C, thân nhiệt bình thường khoảng 37°C.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Nhiệt kế chất lỏng (thủy ngân, rượu) hoạt động dựa trên hiện tượng vật lý nào?',
          options: [
            { id: 'A', text: 'Sự bay hơi của chất lỏng' },
            { id: 'B', text: 'Sự nở vì nhiệt của chất lỏng' },
            { id: 'C', text: 'Sự đông đặc của chất lỏng' },
            { id: 'D', text: 'Sự dẫn điện của chất lỏng' }
          ],
          answer: 'B',
          hints: ['Khi nóng lên, chất lỏng dâng cao; khi lạnh đi, chất lỏng hạ xuống.'],
          explanation: 'Nhiệt kế chất lỏng hoạt động dựa trên sự giãn nở vì nhiệt của chất lỏng.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Trong thang nhiệt độ Celsius (°C), nhiệt độ của nước đá đang tan và nhiệt độ của nước đang sôi lần lượt là:',
          options: [
            { id: 'A', text: '0°C và 100°C' },
            { id: 'B', text: '32°C và 212°C' },
            { id: 'C', text: '10°C và 90°C' },
            { id: 'D', text: '0°C và 50°C' }
          ],
          answer: 'A',
          hints: ['0 độ là điểm đóng băng/tan của nước đá, 100 độ là điểm sôi.'],
          explanation: 'Thang Celsius lấy 0°C là mốc nước đá đang tan và 100°C là mốc nước đang sôi ở áp suất tiêu chuẩn.'
        },
        {
          level: 'van_dung',
          type: 'numeric',
          prompt: 'Một học sinh đo thân nhiệt của mình buổi sáng là 36.8°C, buổi chiều đo lại là 37.3°C. Độ tăng nhiệt độ cơ thể của bạn đó giữa hai lần đo là bao nhiêu °C?',
          answer: '0.5',
          tolerance: 0.02,
          unit: '°C',
          hints: ['Lấy nhiệt độ buổi chiều trừ đi nhiệt độ buổi sáng: 37.3 - 36.8.'],
          explanation: 'Độ tăng nhiệt độ = 37.3 - 36.8 = 0.5°C.'
        }
      ]
    }
  ]
};
