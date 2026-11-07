import type { TextbookChapterSeed } from '../textbook';

export const CHAPTER_10: TextbookChapterSeed = {
  number: 10,
  roman: 'X',
  title: 'Trái Đất và bầu trời',
  description: 'Tìm hiểu chuyển động tự quay của Trái Đất tạo ra ngày và đêm, các pha của Mặt Trăng, cấu trúc Hệ Mặt Trời và Dải Ngân Hà.',
  lessons: [
    {
      number: 52,
      title: 'Chuyển động nhìn thấy của Mặt Trời',
      objectives: [
        'Giải thích được hiện tượng ngày và đêm luân phiên do Trái Đất tự quay quanh trục từ Tây sang Đông.',
        'Hiểu chuyển động mọc ở hướng Đông, lặn ở hướng Tây của Mặt Trời chỉ là chuyển động nhìn thấy biểu kiến.'
      ],
      content: `## I. Chuyển động nhìn thấy của Mặt Trời
- Hàng ngày, ta thấy Mặt Trời mọc ở hướng **Đông**, lên cao dần giữa trưa và lặn ở hướng **Tây**.
- Thực tế, Mặt Trời đứng yên (ở tâm Hệ Mặt Trời), hiện tượng trên là do **Trái Đất tự quay quanh trục của nó từ Tây sang Đông**.
- Chuyển động quay của Trái Đất tạo ra ảo giác Mặt Trời chuyển động quanh Trái Đất (chuyển động nhìn thấy).

## II. Hiện tượng ngày và đêm luân phiên
- Trái Đất có dạng hình cầu nên Mặt Trời chỉ chiếu sáng được một nửa:
  - Nửa được chiếu sáng là **ban ngày**.
  - Nửa nằm trong bóng tối là **ban đêm**.
- Do Trái Đất liên tục tự quay quanh trục theo chu kỳ khoảng **24 giờ** (1 ngày đêm), nên mọi nơi trên Trái Đất đều lần lượt có ngày và đêm luân phiên nhau đều đặn.`,
      keyPoints: [
        'Mặt Trời mọc ở hướng Đông, lặn ở hướng Tây do Trái Đất tự quay từ Tây sang Đông.',
        'Trái Đất hình cầu tự quay quanh trục tạo nên hiện tượng ngày và đêm luân phiên chu kỳ 24 giờ.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Trái Đất tự quay quanh trục của nó theo chiều nào?',
          options: [
            { id: 'A', text: 'Từ Đông sang Tây' },
            { id: 'B', text: 'Từ Tây sang Đông' },
            { id: 'C', text: 'Từ Bắc xuống Nam' },
            { id: 'D', text: 'Từ Nam lên Bắc' }
          ],
          answer: 'B',
          hints: ['Vì Trái Đất quay từ Tây sang Đông nên ta mới nhìn thấy Mặt Trời đi ngược lại từ Đông sang Tây.'],
          explanation: 'Trái Đất tự quay quanh trục theo chiều từ Tây sang Đông.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Nguyên nhân trực tiếp tạo ra hiện tượng ngày và đêm luân phiên nhau trên Trái Đất là gì?',
          options: [
            { id: 'A', text: 'Mặt Trời tắt đi vào ban đêm và bật sáng lại vào ban ngày' },
            { id: 'B', text: 'Trái Đất hình cầu và tự quay quanh trục của nó' },
            { id: 'C', text: 'Các đám mây đen che khuất Mặt Trời' },
            { id: 'D', text: 'Mặt Trăng đứng chắn giữa Mặt Trời và Trái Đất' }
          ],
          answer: 'B',
          hints: ['Dạng hình cầu chỉ sáng một nửa, và chuyển động tự quay làm các vùng lần lượt ra sáng vào tối.'],
          explanation: 'Hình cầu làm nửa sáng nửa tối, và chuyển động tự quay tạo ra sự luân phiên ngày đêm.'
        },
        {
          level: 'van_dung',
          type: 'numeric',
          prompt: 'Trái Đất tự quay một vòng quanh trục của nó mất khoảng thời gian là 24 giờ. Thời gian này tính ra đơn vị phút là bao nhiêu?',
          answer: '1440',
          tolerance: 0.02,
          unit: 'phút',
          hints: ['1 giờ có 60 phút. Hãy nhân 24 với 60.'],
          explanation: '24 giờ = 24 * 60 = 1440 phút.'
        }
      ]
    },
    {
      number: 53,
      title: 'Mặt Trăng',
      objectives: [
        'Nêu được Mặt Trăng là vệ tinh tự nhiên duy nhất của Trái Đất, không tự phát sáng.',
        'Giải thích được hình dạng nhìn thấy của Mặt Trăng (các pha: Trăng tròn, Trăng khuyết, Trăng lưỡi liềm, không Trăng).'
      ],
      content: `## I. Mặt Trăng là vệ tinh của Trái Đất
- **Mặt Trăng** là vệ tinh tự nhiên của Trái Đất, quay quanh Trái Đất theo quỹ đạo gần tròn mất khoảng $29.5$ ngày.
- Mặt Trăng **không tự phát sáng**, ta nhìn thấy Mặt Trăng là nhờ nó **phản xạ ánh sáng từ Mặt Trời** chiếu vào bề mặt của nó.

## II. Các hình dạng nhìn thấy của Mặt Trăng (Tuần trăng)
- Khi Mặt Trăng quay quanh Trái Đất, góc nhìn từ Trái Đất đến phần được chiếu sáng của Mặt Trăng thay đổi liên tục, tạo ra các **pha của Mặt Trăng**:
  1. **Không Trăng (Trăng non / Trăng đầu tháng)**: Phần sáng quay lưng về phía Trái Đất, ta không nhìn thấy trăng (mồng 1 âm lịch).
  2. **Trăng lưỡi liềm đầu tháng**: Nhìn thấy một dải sáng cong hình chữ D mỏng.
  3. **Trăng bán nguyệt đầu tháng**: Nhìn thấy nửa vầng trăng sáng.
  4. **Trăng tròn (Trăng rằm)**: Nhìn thấy toàn bộ nửa được chiếu sáng tròn vành vạnh (ngày 15 âm lịch).
  5. **Trăng khuyết cuối tháng và Trăng lưỡi liềm cuối tháng**.`,
      keyPoints: [
        'Mặt Trăng không tự phát ra ánh sáng mà phản xạ ánh sáng Mặt Trời.',
        'Hình dạng nhìn thấy của Mặt Trăng thay đổi theo chu kỳ khoảng 1 tháng (tuần trăng) do vị trí tương đối giữa Mặt Trời, Trái Đất và Mặt Trăng.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Tại sao từ Trái Đất ban đêm ta lại nhìn thấy Mặt Trăng tỏa sáng dịu mát?',
          options: [
            { id: 'A', text: 'Mặt Trăng là một khối than cháy đỏ rực' },
            { id: 'B', text: 'Bề mặt Mặt Trăng phản chiếu ánh sáng từ Mặt Trời chiếu tới' },
            { id: 'C', text: 'Mặt Trăng có gắn vô số bóng đèn điện khổng lồ' },
            { id: 'D', text: 'Mặt Trăng tự phát ra ánh sáng huỳnh quang' }
          ],
          answer: 'B',
          hints: ['Mặt Trăng đóng vai trò như một chiếc gương phản xạ ánh sáng.'],
          explanation: 'Mặt Trăng không tự phát sáng, nó nhận ánh sáng từ Mặt Trời và phản xạ lại mắt người quan sát.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Vào ngày Rằm tháng Tám (Tết Trung Thu, ngày 15 âm lịch), hình dạng của Mặt Trăng nhìn thấy từ Trái Đất là gì?',
          options: [
            { id: 'A', text: 'Không nhìn thấy Mặt Trăng (Trăng non)' },
            { id: 'B', text: 'Trăng lưỡi liềm mỏng dính' },
            { id: 'C', text: 'Trăng tròn vành vạnh' },
            { id: 'D', text: 'Trăng hình chữ nhật' }
          ],
          answer: 'C',
          hints: ['Ngày rằm toàn bộ nửa được chiếu sáng của Mặt Trăng hướng thẳng về Trái Đất.'],
          explanation: 'Ngày rằm (15 âm lịch), Trái Đất nằm ở giữa Mặt Trời và Mặt Trăng (nhìn lệch góc), ta thấy trọn vẹn nửa được chiếu sáng nên trăng tròn.'
        },
        {
          level: 'van_dung',
          type: 'mcq',
          prompt: 'Một chu kỳ tuần trăng (từ Trăng non đến Trăng tròn rồi lại Trăng non tiếp theo) kéo dài khoảng bao nhiêu ngày?',
          options: [
            { id: 'A', text: 'Khoảng 7 ngày' },
            { id: 'B', text: 'Khoảng 29.5 đến 30 ngày (khoảng 1 tháng âm lịch)' },
            { id: 'C', text: 'Khoảng 365 ngày' },
            { id: 'D', text: 'Khoảng 24 giờ' }
          ],
          answer: 'B',
          hints: ['Độ dài của một tháng theo lịch âm của Việt Nam.'],
          explanation: 'Một chu kỳ tuần trăng kéo dài xấp xỉ 29.5 ngày, là cơ sở để lập ra lịch Âm.'
        }
      ]
    },
    {
      number: 54,
      title: 'Hệ Mặt Trời',
      objectives: [
        'Nêu được cấu trúc cơ bản của Hệ Mặt Trời gồm Mặt Trời ở trung tâm và 8 hành tinh quay quanh.',
        'Kể tên được 8 hành tinh theo thứ tự khoảng cách xa dần Mặt Trời.'
      ],
      content: `## I. Cấu trúc Hệ Mặt Trời
- **Hệ Mặt Trời** (Thái Dương Hệ) gồm có:
  - **Mặt Trời**: Ngôi sao tự phát sáng nằm ở vị trí trung tâm, chiếm tới $99.8\\%$ tổng khối lượng của toàn hệ.
  - **8 hành tinh** chuyển động trên các quỹ đạo elip quanh Mặt Trời.
  - Các vệ tinh tự nhiên, tiểu hành tinh, sao chổi và bụi vũ trụ.

## II. 8 hành tinh theo thứ tự từ gần đến xa Mặt Trời
1. **Thủy tinh** (Mercury - hành tinh nhỏ nhất và gần nhất).
2. **Kim tinh** (Venus - Sao Mai/Sao Hôm, hành tinh nóng nhất do hiệu ứng nhà kính cực mạnh).
3. **Trái Đất** (Earth - hành tinh xanh duy nhất được biết có sự sống).
4. **Hỏa tinh** (Mars - Hành tinh Đỏ, có nhiều rãnh sông cạn và băng ở hai cực).
5. **Mộc tinh** (Jupiter - hành tinh lớn nhất, có vết đỏ lớn khổng lồ).
6. **Thổ tinh** (Saturn - hành tinh có hệ thống vành đai vành khuyên tuyệt đẹp).
7. **Thiên Vương tinh** (Uranus - hành tinh băng khổng lồ quay nghiêng).
8. **Hải Vương tinh** (Neptune - hành tinh xa nhất, màu xanh lam rực rỡ với bão dữ dội).`,
      keyPoints: [
        'Mặt Trời là ngôi sao ở trung tâm, chiếm hầu hết khối lượng của hệ.',
        'Thứ tự 8 hành tinh: Thủy - Kim - Trái Đất - Hỏa - Mộc - Thổ - Thiên Vương - Hải Vương.',
        'Mộc tinh là hành tinh lớn nhất; Thủy tinh gần Mặt Trời nhất.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Hành tinh nào có kích thước và khối lượng LỚN NHẤT trong Hệ Mặt Trời?',
          options: [
            { id: 'A', text: 'Trái Đất' },
            { id: 'B', text: 'Mộc tinh (Sao Mộc)' },
            { id: 'C', text: 'Thủy tinh (Sao Thủy)' },
            { id: 'D', text: 'Hải Vương tinh' }
          ],
          answer: 'B',
          hints: ['Khối khí khổng lồ có "Vết Đỏ Lớn", to hơn tất cả các hành tinh khác gộp lại.'],
          explanation: 'Mộc tinh (Jupiter) là hành tinh lớn nhất trong 8 hành tinh của Hệ Mặt Trời.'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Thứ tự đúng của 4 hành tinh gần Mặt Trời nhất (các hành tinh đất đá) xếp theo chiều khoảng cách xa dần là:',
          options: [
            { id: 'A', text: 'Thủy tinh -> Kim tinh -> Trái Đất -> Hỏa tinh' },
            { id: 'B', text: 'Kim tinh -> Thủy tinh -> Trái Đất -> Mộc tinh' },
            { id: 'C', text: 'Trái Đất -> Thủy tinh -> Hỏa tinh -> Kim tinh' },
            { id: 'D', text: 'Thủy tinh -> Trái Đất -> Kim tinh -> Hỏa tinh' }
          ],
          answer: 'A',
          hints: ['Thủy tinh ở số 1, tiếp đến là Kim tinh (sao Hôm), thứ ba là Trái Đất, thứ tư là Hỏa tinh.'],
          explanation: 'Thứ tự chuẩn từ gần ra xa: Thủy tinh -> Kim tinh -> Trái Đất -> Hỏa tinh.'
        },
        {
          level: 'van_dung',
          type: 'numeric',
          prompt: 'Khoảng cách trung bình từ Trái Đất đến Mặt Trời là khoảng 150 triệu km. Ánh sáng truyền đi với tốc độ 300 000 km/s. Thời gian ánh sáng từ Mặt Trời truyền đến Trái Đất là bao nhiêu giây (s)?',
          answer: '500',
          tolerance: 0.02,
          unit: 's',
          hints: ['Lấy quãng đường 150 000 000 chia cho tốc độ 300 000 (khoảng 8 phút 20 giây).'],
          explanation: 'Thời gian = 150 000 000 / 300 000 = 500 giây.'
        }
      ]
    },
    {
      number: 55,
      title: 'Ngân Hà',
      objectives: [
        'Nêu được Ngân Hà là một thiên hà dạng xoắn ốc chứa hàng trăm tỉ ngôi sao, trong đó có Hệ Mặt Trời.',
        'Hiểu kích thước vĩ đại của vũ trụ và vị trí khiêm tốn của Trái Đất trong Ngân Hà.'
      ],
      content: `## I. Ngân Hà là gì?
- Vào những đêm hè trời trong không mây xa ánh đèn thành phố, ta nhìn thấy một dải sáng màu bạc vắt ngang qua bầu trời như một dòng sông sáng lấp lánh, người xưa gọi là **Sông Ngân** (Ngân Hà).
- Về bản chất khoa học: **Ngân Hà** (Milky Way) là một **thiên hà** khổng lồ hình xoắn ốc gồm hơn **200 tỉ ngôi sao**, cùng vô số bụi và khí vũ trụ.

## II. Hệ Mặt Trời trong Ngân Hà
- Ngân Hà có đường kính khổng lồ khoảng **100 000 năm ánh sáng** (1 năm ánh sáng là quãng đường ánh sáng bay trong 1 năm, xấp xỉ $9.5$ nghìn tỉ km).
- **Hệ Mặt Trời** của chúng ta nằm ở một nhánh xoắn ốc (nhánh Orion), cách tâm Ngân Hà khoảng **26 000 năm ánh sáng**.
- Toàn bộ Hệ Mặt Trời đang cùng quay quanh tâm Ngân Hà với tốc độ khoảng $220\\text{ km/s}$, mất khoảng 230 triệu năm để hoàn thành một vòng quay.`,
      keyPoints: [
        'Ngân Hà là thiên hà xoắn ốc khổng lồ chứa hàng trăm tỉ ngôi sao, đường kính khoảng 100 000 năm ánh sáng.',
        'Hệ Mặt Trời chỉ là một chấm nhỏ nằm ở vùng ven nhánh xoắn ốc của Ngân Hà.',
        'Năm ánh sáng là đơn vị đo khoảng cách trong thiên văn học.'
      ],
      exercises: [
        {
          level: 'nhan_biet',
          type: 'mcq',
          prompt: 'Trong thiên văn học, "Năm ánh sáng" là đơn vị dùng để đo đại lượng nào?',
          options: [
            { id: 'A', text: 'Đo thời gian tính bằng năm' },
            { id: 'B', text: 'Đo khoảng cách cực lớn giữa các thiên thể trong vũ trụ' },
            { id: 'C', text: 'Đo độ sáng của ngôi sao' },
            { id: 'D', text: 'Đo nhiệt độ trên bề mặt Mặt Trời' }
          ],
          answer: 'B',
          hints: ['Là quãng đường mà tia sáng đi được trong thời gian một năm.'],
          explanation: 'Năm ánh sáng là đơn vị đo chiều dài/khoảng cách cực lớn trong vũ trụ (~9.5 nghìn tỉ km).'
        },
        {
          level: 'thong_hieu',
          type: 'mcq',
          prompt: 'Vị trí của Hệ Mặt Trời nằm ở đâu trong Ngân Hà (Milky Way)?',
          options: [
            { id: 'A', text: 'Nằm ngay tại điểm tâm chính giữa của Ngân Hà' },
            { id: 'B', text: 'Nằm ở vùng ven, trên một nhánh xoắn ốc cách tâm khoảng 26 000 năm ánh sáng' },
            { id: 'C', text: 'Nằm hoàn toàn bên ngoài không gian của Ngân Hà' },
            { id: 'D', text: 'Nằm lơ lửng ở cực Bắc của Ngân Hà' }
          ],
          answer: 'B',
          hints: ['Chúng ta ở vùng rìa thanh bình, không nằm ở tâm nơi có lỗ đen siêu nặng.'],
          explanation: 'Hệ Mặt Trời nằm trên nhánh xoắn ốc Orion, cách tâm Ngân Hà khoảng 26 000 năm ánh sáng.'
        },
        {
          level: 'van_dung',
          type: 'mcq',
          prompt: 'Thiên hà Ngân Hà của chúng ta có hình dạng cấu trúc như thế nào khi nhìn từ không gian?',
          options: [
            { id: 'A', text: 'Hình khối lập phương vuông vức' },
            { id: 'B', text: 'Hình xoắn ốc có các cánh tay xoắn với phần nhân phồng sáng ở tâm' },
            { id: 'C', text: 'Hình một đường thẳng tắp không có bề dày' },
            { id: 'D', text: 'Hình tam giác đều' }
          ],
          answer: 'B',
          hints: ['Giống như một chiếc chong chóng quay tròn có các cánh tay xoắn ốc.'],
          explanation: 'Ngân Hà là thiên hà xoắn ốc có thanh chắn (Barred spiral galaxy) với các nhánh xoắn tuyệt đẹp.'
        }
      ]
    }
  ]
};
