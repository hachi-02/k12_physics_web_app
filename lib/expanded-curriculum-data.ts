// lib/expanded-curriculum-data.ts
// Comprehensive curriculum additions for K-12 Physics GDPT 2018
import type { CurriculumTopicSeed } from './curriculum-data';

export const EXPANDED_CURRICULUM_DATA: CurriculumTopicSeed[] = [
  {
    "grade": 1,
    "tier": "primary",
    "topicTitle": "Nóng, lạnh và các mùa trong năm",
    "slug": "lop-1-nong-lanh-thoi-tiet",
    "topicDescription": "Cảm nhận nhiệt độ cơ thể, thời tiết bốn mùa và cách giữ ấm, làm mát cơ thể.",
    "icon": "Thermometer",
    "lessonTitle": "Cảm nhận sự nóng và lạnh",
    "lessonSlug": "cam-nhan-nong-lanh",
    "contentMarkdown": "# Nóng và lạnh xung quanh em\n\nMỗi ngày, chúng ta đều cảm nhận được sự nóng và lạnh:\n- Mùa hè ánh nắng chói chang, không khí **nóng bức**, ta thích ăn kem mát lạnh và bật quạt.\n- Mùa đông có gió bấc thổi, thời tiết **lạnh giá**, ta cần mặc áo len và đội mũ ấm để bảo vệ cơ thể.\n- Một bát canh vừa nấu xong tỏa khói nghi ngút là vật **nóng**, còn viên đá lấy từ tủ lạnh ra là vật **lạnh**.\n\nĐể biết chính xác vật nóng hay lạnh bao nhiêu, người ta sử dụng chiếc **nhiệt kế**!",
    "summary": "Thời tiết và đồ vật có trạng thái nóng hoặc lạnh. Ta cần giữ ấm khi trời lạnh và làm mát khi trời nóng.",
    "durationMinutes": 15,
    "parentGuide": {
      "summary": "Dạy trẻ phân biệt cảm giác nóng - lạnh từ môi trường và các vật dụng, hình thành ý thức an toàn tránh bị bỏng hoặc nhiễm lạnh.",
      "misconceptions": [
        "Trẻ nghĩ nước đá tỏa ra khói là do nước đá đang sôi nóng giống như nồi canh.",
        "Trẻ nghĩ mặc nhiều áo ấm sẽ tự tạo ra nhiệt chứ không phải giữ nhiệt cơ thể."
      ],
      "guiding_questions": [
        "Khi con chạm tay vào cốc nước đá, con thấy tay mình ấm lên hay mát lạnh?",
        "Vì sao mùa đông ra đường con phải mặc áo khoác dày và quàng khăn ấm?"
      ],
      "home_experiments": [
        {
          "title": "Khám phá sự truyền nhiệt qua chiếc thìa",
          "materials": [
            "1 chiếc thìa kim loại nhỏ",
            "1 cốc nước ấm an toàn khoảng 40 độ C"
          ],
          "steps": [
            "Cho thìa kim loại vào cốc nước ấm trong 1 phút.",
            "Bảo trẻ chạm nhẹ vào cán thìa phía trên mặt nước và cảm nhận."
          ],
          "expected_outcome": "Cán thìa ấm lên do nhiệt truyền từ nước nóng qua kim loại đến tay trẻ.",
          "safety_notes": "Dùng nước ấm vừa phải, tuyệt đối không dùng nước sôi tránh gây bỏng cho trẻ."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Đồ vật nào dưới đây cho ta cảm giác lạnh buốt khi chạm tay vào?",
        "options": [
          {
            "id": "A",
            "text": "Bát cháo vừa nấu sôi"
          },
          {
            "id": "B",
            "text": "Viên đá lạnh lấy từ tủ đông"
          },
          {
            "id": "C",
            "text": "Chiếc áo len phơi ngoài nắng"
          },
          {
            "id": "D",
            "text": "Bình nước ấm của mẹ"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Vật nào thường được cho vào cốc nước mía để giải khát trong ngày hè nóng nực?"
          }
        ],
        "explanation": "Viên đá lạnh ở nhiệt độ dưới 0 độ C lấy nhiệt từ tay ta làm ta cảm thấy lạnh buốt."
      }
    ]
  },
  {
    "grade": 1,
    "tier": "primary",
    "topicTitle": "Âm thanh trong tự nhiên & Cuộc sống",
    "slug": "lop-1-am-thanh-tu-nhien",
    "topicDescription": "Nhận biết các âm thanh to, nhỏ, trầm, bổng từ thiên nhiên và các phương tiện quanh em.",
    "icon": "Volume2",
    "lessonTitle": "Lắng nghe thế giới âm thanh",
    "lessonSlug": "lang-nghe-am-thanh",
    "contentMarkdown": "# Thế giới âm thanh muôn màu\n\nMỗi sớm mai thức dậy, em nghe thấy tiếng chim hót líu lo, tiếng gà trống gáy vang, tiếng xe cộ chạy rộn ràng trên đường.\n\nÂm thanh có thể rất đa dạng:\n- Có âm thanh **dịu êm** như tiếng mẹ ru, tiếng lá cây xào xạc.\n- Có âm thanh **to vang** như tiếng còi cứu hỏa, tiếng sấm sét.\n- Âm thanh giúp con người giao tiếp, cảnh báo nguy hiểm và thưởng thức âm nhạc tươi vui.",
    "summary": "Âm thanh có ở khắp nơi quanh ta với mức độ to nhỏ khác nhau, giúp con người nhận biết thế giới.",
    "durationMinutes": 15,
    "parentGuide": {
      "summary": "Giúp trẻ phát triển thính giác, học cách phân biệt tiếng ồn có hại và âm thanh tự nhiên dễ chịu.",
      "misconceptions": [
        "Trẻ nghĩ những âm thanh quá to kéo dài chỉ gây khó chịu chứ không làm hỏng thính giác.",
        "Trẻ nghĩ tiếng động vật phát ra không phải là âm thanh."
      ],
      "guiding_questions": [
        "Con thích nghe tiếng chim hót buổi sáng hay tiếng còi xe inh ỏi ngoài đường hơn?",
        "Khi em bé đang ngủ say, chúng ta nên nói chuyện thì thầm hay hét thật to?"
      ],
      "home_experiments": [
        {
          "title": "Điện thoại dây cốc giấy kỳ diệu",
          "materials": [
            "2 chiếc cốc giấy",
            "1 sợi chỉ dài khoảng 3 mét",
            "2 que tăm nhỏ"
          ],
          "steps": [
            "Chọc một lỗ nhỏ dưới đáy mỗi cốc, xỏ sợi chỉ qua và buộc vào que tăm để giữ chặt.",
            "Hai mẹ con cầm hai đầu cốc, kéo sợi chỉ thật căng thẳng.",
            "Một người nói nhỏ vào cốc, người kia áp miệng cốc vào tai để lắng nghe."
          ],
          "expected_outcome": "Tiếng thì thầm truyền qua đáy cốc làm rung sợi chỉ và truyền rõ mồn một đến tai người kia.",
          "safety_notes": "Cẩn thận khi dùng que nhọn chọc thủng đáy cốc giấy."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Âm thanh nào sau đây phát ra từ thiên nhiên tự nhiên?",
        "options": [
          {
            "id": "A",
            "text": "Tiếng còi ô tô bóp inh ỏi"
          },
          {
            "id": "B",
            "text": "Tiếng suối chảy róc rách"
          },
          {
            "id": "C",
            "text": "Tiếng máy khoan bê tông"
          },
          {
            "id": "D",
            "text": "Tiếng chuông điện thoại reo"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Âm thanh này không do máy móc hay đồ dùng của con người tạo ra."
          }
        ],
        "explanation": "Tiếng suối chảy là âm thanh của thiên nhiên hoang dã."
      }
    ]
  },
  {
    "grade": 1,
    "tier": "primary",
    "topicTitle": "Nước: Các trạng thái và sự kỳ diệu",
    "slug": "lop-1-nuoc-va-trang-thai",
    "topicDescription": "Tìm hiểu nước ở trạng thái lỏng, trạng thái rắn (đá) và trạng thái hơi nước.",
    "icon": "Droplets",
    "lessonTitle": "Nước biến hình như thế nào?",
    "lessonSlug": "nuoc-bien-hinh",
    "contentMarkdown": "# Nước - Nhà ảo thuật kỳ tài\n\nNước là chất lỏng không màu, không mùi, không vị nhưng có thể biến hình rất kỳ diệu:\n- Nước uống hàng ngày ở thể **lỏng**, chảy thành dòng và mang hình dạng của chiếc cốc đựng nó.\n- Khi cho nước vào ngăn đá tủ lạnh, nước đóng băng thành **nước đá** cứng ngắc ở thể rắn.\n- Khi đun sôi nước, nước bốc hơi thành những làn **hơi nước** bay lơ lửng trong không khí.",
    "summary": "Nước có 3 thể: thể lỏng (nước thường), thể rắn (nước đá) và thể khí (hơi nước).",
    "durationMinutes": 15,
    "parentGuide": {
      "summary": "Dạy trẻ quan sát 3 trạng thái của nước trong tự nhiên và hiểu tầm quan trọng của nguồn nước sạch.",
      "misconceptions": [
        "Trẻ nghĩ nước đá và nước uống là hai chất hoàn toàn khác nhau.",
        "Trẻ nghĩ khi nước bốc hơi là nước đã biến mất vĩnh viễn."
      ],
      "guiding_questions": [
        "Đố con viên đá trong cốc nước ngọt để một lúc lâu dưới trời nóng sẽ biến thành gì?",
        "Khi mẹ phơi quần áo ướt ngoài nắng, nước trên áo đã đi đâu mà quần áo lại khô ráo?"
      ],
      "home_experiments": [
        {
          "title": "Sự ngưng tụ hơi nước trên nắp nồi",
          "materials": [
            "1 cốc thủy tinh chịu nhiệt đựng nước ấm",
            "1 chiếc đĩa nhỏ đậy lên miệng cốc",
            "2 viên đá lạnh"
          ],
          "steps": [
            "Rót nước ấm vào cốc thủy tinh rồi đậy chiếc đĩa lên trên.",
            "Đặt 2 viên đá lạnh lên mặt trên của chiếc đĩa.",
            "Quan sát mặt dưới của chiếc đĩa sau 2 phút."
          ],
          "expected_outcome": "Hơi nước ấm bay lên gặp đĩa lạnh ngưng tụ thành những giọt nước đọng dưới đáy đĩa giống như mưa.",
          "safety_notes": "Thực hiện với nước ấm an toàn dưới sự giám sát của người lớn."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Khi để một viên nước đá ngoài trời nắng, hiện tượng gì sẽ xảy ra?",
        "options": [
          {
            "id": "A",
            "text": "Viên đá cứng hơn và to ra"
          },
          {
            "id": "B",
            "text": "Viên đá tan chảy thành nước lỏng"
          },
          {
            "id": "C",
            "text": "Viên đá bốc cháy ngùn ngụt"
          },
          {
            "id": "D",
            "text": "Viên đá biến thành cát"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Nhiệt độ nóng của ánh nắng làm nước đá chuyển từ thể rắn sang thể gì?"
          }
        ],
        "explanation": "Nước đá nhận nhiệt từ môi trường nóng và tan chảy thành thể lỏng."
      }
    ]
  },
  {
    "grade": 2,
    "tier": "primary",
    "topicTitle": "Nguồn sáng và cách bảo vệ mắt",
    "slug": "lop-2-nguon-sang-bao-ve-mat",
    "topicDescription": "Phân biệt nguồn sáng tự nhiên, nhân tạo và cách giữ gìn thị lực khi học tập.",
    "icon": "Sun",
    "lessonTitle": "Ánh sáng và đôi mắt tinh anh",
    "lessonSlug": "anh-sang-va-doi-mat",
    "contentMarkdown": "# Ánh sáng giúp ta nhìn thấy mọi vật\n\nMắt chúng ta chỉ có thể nhìn thấy đồ vật khi có **ánh sáng** từ vật đó truyền vào mắt:\n- **Nguồn sáng tự nhiên**: Mặt Trời, các vì sao ban đêm, đom đóm.\n- **Nguồn sáng nhân tạo**: Đèn học, đèn pin, ngọn nến, màn hình tivi.\n\nĐể bảo vệ đôi mắt luôn sáng khỏe:\n- Ngồi học nơi có đầy đủ ánh sáng, không học trong phòng tối.\n- Không nhìn trực tiếp vào ánh nắng Mặt Trời hoặc bóng đèn quá chói.\n- Giữ khoảng cách khi xem tivi và màn hình điện thoại.",
    "summary": "Ta nhìn thấy vật khi có ánh sáng chiếu từ vật vào mắt. Cần đủ ánh sáng khi đọc sách để bảo vệ mắt.",
    "durationMinutes": 15,
    "parentGuide": {
      "summary": "Giải thích cơ chế nhìn thấy của mắt và rèn luyện thói quen học tập đủ sáng để phòng tránh cận thị học đường.",
      "misconceptions": [
        "Nhiều trẻ nghĩ mắt tự phát ra ánh sáng để quét và nhìn thấy đồ vật trong đêm tối giống như siêu nhân.",
        "Trẻ nghĩ đọc sách dưới bóng tối mờ mờ chỉ cần tập trung là không hại mắt."
      ],
      "guiding_questions": [
        "Nếu con bước vào phòng kín không có cửa sổ và tắt hết đèn, mắt con có nhìn thấy đồ chơi để dưới sàn không?",
        "Tại sao bố mẹ luôn dặn con phải bật đèn bàn học sáng rõ khi làm bài tập?"
      ],
      "home_experiments": [
        {
          "title": "Chiếc hộp bí mật trong bóng tối",
          "materials": [
            "1 chiếc hộp các tông có nắp kín",
            "1 đồ chơi nhỏ",
            "1 cây bút chì nhọn"
          ],
          "steps": [
            "Cho đồ chơi vào hộp, đậy nắp kín, khoét 1 lỗ nhỏ trên nắp để nhìn vào.",
            "Bảo trẻ nhìn vào lỗ và hỏi có thấy đồ chơi màu gì không (không thấy gì).",
            "Dùng bút chọc thêm 1 lỗ ở thành hộp để ánh sáng lọt vào và bảo trẻ nhìn lại."
          ],
          "expected_outcome": "Khi có ánh sáng lọt vào, đồ chơi phản xạ ánh sáng đến mắt giúp trẻ nhìn thấy rõ đồ vật.",
          "safety_notes": "Cẩn thận khi dùng vật nhọn đục lỗ trên bìa cứng."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Khi nào mắt chúng ta có thể nhìn thấy một quyển sách đặt trên bàn?",
        "options": [
          {
            "id": "A",
            "text": "Khi căn phòng hoàn toàn tối đen không có chút ánh sáng nào"
          },
          {
            "id": "B",
            "text": "Khi có ánh sáng từ bóng đèn chiếu vào sách rồi truyền đến mắt ta"
          },
          {
            "id": "C",
            "text": "Khi mắt ta tự phát ra tia sáng chiếu vào quyển sách"
          },
          {
            "id": "D",
            "text": "Khi ta nhắm chặt cả hai mắt lại"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Cần có nguồn sáng chiếu vào vật rồi phản xạ tới cơ quan thị giác của ta."
          }
        ],
        "explanation": "Ta chỉ nhìn thấy vật khi có ánh sáng từ vật đó đi tới mắt."
      }
    ]
  },
  {
    "grade": 2,
    "tier": "primary",
    "topicTitle": "Đồ vật quanh ta: Chìm hay nổi?",
    "slug": "lop-2-chim-hay-noi",
    "topicDescription": "Khám phá sự chìm - nổi của các chất liệu gỗ, sắt, xốp, nhựa trong nước.",
    "icon": "Ship",
    "lessonTitle": "Vì sao chiếc lá nổi còn hòn sỏi chìm?",
    "lessonSlug": "vi-sao-la-noi-soi-chim",
    "contentMarkdown": "# Bí ẩn chìm và nổi trong nước\n\nKhi thả đồ vật vào chậu nước:\n- Có vật **nổi bồng bềnh** trên mặt nước: Chiếc lá khô, mẩu gỗ, chiếc thuyền xốp, quả bóng nhựa.\n- Có vật **chìm nghỉm** xuống đáy: Hòn sỏi, chìa khóa kim loại, chiếc thìa sắt, đồng xu.\n\nĐiều này phụ thuộc vào chất liệu làm nên vật và hình dạng của nó. Nước có một sức đẩy vô hình luôn nâng đỡ các vật thể!",
    "summary": "Các vật nhẹ hơn nước như xốp, gỗ sẽ nổi; các vật nặng bằng sắt, đá sẽ chìm xuống đáy chậu nước.",
    "durationMinutes": 15,
    "parentGuide": {
      "summary": "Giúp trẻ quan sát trực quan tính chất vật liệu và gieo mầm khái niệm khối lượng riêng và lực đẩy chất lỏng.",
      "misconceptions": [
        "Trẻ nghĩ vật cứ to là chìm còn vật nhỏ là nổi (ví dụ nghĩ khúc gỗ to chìm hơn chiếc đinh nhỏ).",
        "Trẻ nghĩ tàu thủy to lớn bằng thép không thể nào nổi trên mặt biển."
      ],
      "guiding_questions": [
        "Con đoán xem quả bóng bay bơm căng to thế này thả vào chậu nước sẽ chìm hay nổi?",
        "Một chiếc thuyền làm bằng xốp to gấp 10 lần hòn sỏi, tại sao thuyền nổi mà hòn sỏi lại chìm?"
      ],
      "home_experiments": [
        {
          "title": "Chiếc thuyền đất nặn biến hình",
          "materials": [
            "1 cục đất nặn màu",
            "1 chậu nước nhỏ"
          ],
          "steps": [
            "Vo tròn cục đất nặn thành một viên bi đặc rồi thả vào chậu nước (viên đất chìm xuống đáy).",
            "Vớt cục đất lên, dùng tay nặn mỏng ra thành hình chiếc thuyền có lòng sâu.",
            "Nhẹ nhàng thả chiếc thuyền đất nặn lên mặt nước và quan sát."
          ],
          "expected_outcome": "Cùng một lượng đất nặn, khi dàn mỏng thành hình thuyền chứa không khí thì thuyền nổi bồng bềnh.",
          "safety_notes": "Lau khô tay sau khi nghịch nước tránh trơn trượt."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Vật nào sau đây chắc chắn sẽ NỔI khi thả vào chậu nước?",
        "options": [
          {
            "id": "A",
            "text": "Một chiếc đinh sắt nhọn"
          },
          {
            "id": "B",
            "text": "Một hòn đá cuội đặc"
          },
          {
            "id": "C",
            "text": "Một miếng xốp nhẹ"
          },
          {
            "id": "D",
            "text": "Một chiếc thìa inox nặng"
          }
        ],
        "correct_answer": "C",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Chất liệu này rất nhẹ, thường dùng để bọc bảo vệ tivi, tủ lạnh khi vận chuyển."
          }
        ],
        "explanation": "Miếng xốp có khối lượng riêng rất nhỏ so với nước nên nổi trên mặt nước."
      }
    ]
  },
  {
    "grade": 2,
    "tier": "primary",
    "topicTitle": "Gió, không khí và chuyển động",
    "slug": "lop-2-gio-khong-khi-chuyen-dong",
    "topicDescription": "Khám phá sự tồn tại của không khí và gió là sự chuyển động của không khí.",
    "icon": "Wind",
    "lessonTitle": "Gió từ đâu tới?",
    "lessonSlug": "gio-tu-dau-toi",
    "contentMarkdown": "# Không khí chuyển động tạo thành gió\n\nXung quanh chúng ta luôn tràn ngập **không khí**, dù mắt ta không nhìn thấy được.\n- Khi không khí đứng yên, ta cảm thấy oi ả, êm ả.\n- Khi không khí **chuyển động**, nó tạo thành **gió** làm bay tóc, làm chong chóng quay tít và đẩy cánh buồm lướt sóng.\n- Gió nhẹ làm lá cây rung rinh gọi là gió hiu hiu; gió quá mạnh gọi là giông bão.",
    "summary": "Không khí có ở khắp nơi quanh ta. Khi không khí chuyển động sẽ tạo thành luồng gió.",
    "durationMinutes": 15,
    "parentGuide": {
      "summary": "Giúp trẻ chứng minh sự tồn tại của không khí vô hình và hiểu năng lượng của gió trong cuộc sống.",
      "misconceptions": [
        "Trẻ nghĩ trong căn phòng trống hoặc chiếc cốc rỗng hoàn toàn không có gì bên trong.",
        "Trẻ nghĩ gió là một vật thể độc lập chứ không phải là không khí di chuyển."
      ],
      "guiding_questions": [
        "Khi con thổi mạnh vào chong chóng giấy, cái gì đã làm cho chong chóng quay tít?",
        "Chiếc quạt máy trong nhà có tạo ra không khí mới không hay chỉ đẩy không khí có sẵn chuyển động?"
      ],
      "home_experiments": [
        {
          "title": "Bắt quả tang không khí trong cốc nước",
          "materials": [
            "1 chiếc cốc thủy tinh trong suốt",
            "1 mẩu giấy ăn nhỏ vo tròn",
            "1 chậu nước sâu"
          ],
          "steps": [
            "Nhét mẩu giấy ăn chặt vào đáy cốc thủy tinh (úp ngược cốc xuống giấy không rơi).",
            "Úp ngược miệng cốc thẳng đứng và ấn chìm sâu hoàn toàn vào trong chậu nước.",
            "Kéo cốc thẳng đứng lên, lấy mẩu giấy ra kiểm tra xem giấy khô hay ướt."
          ],
          "expected_outcome": "Mẩu giấy hoàn toàn khô ráo vì không khí bên trong cốc chiếm chỗ không cho nước tràn vào.",
          "safety_notes": "Thực hiện nhẹ nhàng không làm đổ nước ra sàn nhà."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Gió tự nhiên thực chất là gì?",
        "options": [
          {
            "id": "A",
            "text": "Là những đám mây đen rơi xuống đất"
          },
          {
            "id": "B",
            "text": "Là không khí chuyển động từ nơi này sang nơi khác"
          },
          {
            "id": "C",
            "text": "Là nước biển bốc hơi lên trời"
          },
          {
            "id": "D",
            "text": "Là ánh nắng Mặt Trời chiếu thẳng vào mắt"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Không khí bao quanh Trái Đất khi bị nóng lạnh khác nhau sẽ dịch chuyển."
          }
        ],
        "explanation": "Gió là hiện tượng không khí chuyển động trong khí quyển."
      }
    ]
  },
  {
    "grade": 3,
    "tier": "primary",
    "topicTitle": "Nhiệt độ và dụng cụ đo nhiệt độ",
    "slug": "lop-3-nhiet-do-nhiet-ke",
    "topicDescription": "Học cách sử dụng nhiệt kế đo nhiệt độ cơ thể và nhiệt độ không khí theo thang độ C.",
    "icon": "Thermometer",
    "lessonTitle": "Đo nhiệt độ bằng nhiệt kế",
    "lessonSlug": "do-nhiet-do-nhiet-ke",
    "contentMarkdown": "# Nhiệt độ là gì?\n\nNhiệt độ là thước đo độ nóng hay lạnh của một vật thể:\n- Đơn vị đo nhiệt độ thông dụng ở Việt Nam là **độ C** (ký hiệu: $^\\circ\\text{C}$).\n- Nhiệt độ cơ thể người khỏe mạnh bình thường là khoảng $37^\\circ\\text{C}$.\n- Nước đá đang tan ở $0^\\circ\\text{C}$, còn nước sôi sùng sục ở $100^\\circ\\text{C}$.\n\nĐể đo nhiệt độ, ta dùng **nhiệt kế** (như nhiệt kế thủy ngân, nhiệt kế điện tử, nhiệt kế hồng ngoại).",
    "summary": "Nhiệt độ đo mức độ nóng lạnh của vật bằng đơn vị độ C. Dụng cụ đo là nhiệt kế.",
    "durationMinutes": 15,
    "parentGuide": {
      "summary": "Hướng dẫn trẻ cách đọc số đo nhiệt độ và hiểu ý nghĩa việc đo thân nhiệt khi bị ốm sốt.",
      "misconceptions": [
        "Trẻ nghĩ dùng tay sờ trán là có thể biết chính xác cơ thể sốt bao nhiêu độ.",
        "Trẻ nghĩ nhiệt độ của nước đá có thể tăng lên nếu đắp chăn ấm cho nó."
      ],
      "guiding_questions": [
        "Khi con bị sốt mệt mỏi, mẹ dùng dụng cụ gì để biết chính xác con sốt bao nhiêu độ?",
        "Nếu dự báo thời tiết báo hôm nay nhiệt độ là $38^\\circ\\text{C}$, con nên mặc trang phục như thế nào khi ra ngoài?"
      ],
      "home_experiments": [
        {
          "title": "Tay ta có phải là chiếc nhiệt kế chính xác?",
          "materials": [
            "3 chiếc bát: Bát 1 nước lạnh (có đá), Bát 2 nước thường, Bát 3 nước ấm khoảng 40 độ"
          ],
          "steps": [
            "Nhúng bàn tay trái vào bát nước lạnh, bàn tay phải vào bát nước ấm trong 30 giây.",
            "Rút cả 2 tay ra và cùng lúc nhúng ngay vào bát nước thường ở giữa.",
            "Hỏi cảm giác của 2 bàn tay về nhiệt độ của bát nước thường."
          ],
          "expected_outcome": "Tay trái thấy nước ấm lên, tay phải lại thấy nước lạnh đi dù cùng một bát nước thường. Chứng tỏ cảm giác tay không thể thay thế nhiệt kế.",
          "safety_notes": "Dùng nước ấm an toàn không gây rát bỏng tay trẻ."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Thân nhiệt bình thường của một người khỏe mạnh là khoảng bao nhiêu độ C?",
        "options": [
          {
            "id": "A",
            "text": "10 độ C"
          },
          {
            "id": "B",
            "text": "37 độ C"
          },
          {
            "id": "C",
            "text": "60 độ C"
          },
          {
            "id": "D",
            "text": "100 độ C"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Nhiệt độ này ấm hơn nhiệt độ phòng bình thường một chút, xấp xỉ 37 độ."
          }
        ],
        "explanation": "Thân nhiệt chuẩn của người bình thường duy trì ổn định quanh mức 37 độ C."
      }
    ]
  },
  {
    "grade": 3,
    "tier": "primary",
    "topicTitle": "Không khí quanh ta: Tính chất và vai trò",
    "slug": "lop-3-khong-khi-quanh-ta",
    "topicDescription": "Không khí không màu, không mùi, có thể nén lại hoặc giãn ra và cần cho sự thở.",
    "icon": "Cloud",
    "lessonTitle": "Bí mật của lớp khí quyển",
    "lessonSlug": "bi-mat-khi-quyen",
    "contentMarkdown": "# Tính chất kỳ thú của không khí\n\nKhông khí bao bọc xung quanh toàn bộ Trái Đất:\n- Không khí **trong suốt, không màu, không mùi, không vị**.\n- Không khí **không có hình dạng nhất định**, nó chiếm đầy mọi không gian bên trong vật chứa.\n- Không khí có thể **bị nén lại** (như khi ta ấn pít-tông bơm xe đạp) hoặc **giãn ra**.\n- Trong không khí có khí oxy vô cùng quý giá cần cho con người, động vật hô hấp và duy trì sự cháy.",
    "summary": "Không khí không màu, không mùi, chiếm đầy không gian, có thể nén lại và duy trì sự sống.",
    "durationMinutes": 15,
    "parentGuide": {
      "summary": "Giúp trẻ hiểu không khí là vật chất có thực, có thể tích và khối lượng, rèn ý thức bảo vệ bầu không khí trong lành.",
      "misconceptions": [
        "Trẻ nghĩ không khí không có trọng lượng vì ta không cảm thấy nó nặng trên vai.",
        "Trẻ nghĩ cá dưới nước không cần không khí để hô hấp."
      ],
      "guiding_questions": [
        "Nếu con lấy tay bịt chặt mũi và ngậm miệng trong 15 giây, con cảm thấy thế nào? Vì sao?",
        "Khi con bơm hơi vào quả bóng đá, quả bóng căng phồng lên là nhờ cái gì ở bên trong?"
      ],
      "home_experiments": [
        {
          "title": "Chiếc xilanh chứng minh không khí có thể nén lại",
          "materials": [
            "1 chiếc xilanh nhựa y tế bỏ kim tiêm"
          ],
          "steps": [
            "Kéo pít-tông ra để hút đầy không khí vào trong xilanh.",
            "Dùng đầu ngón tay cái bịt thật chặt lỗ thoát khí ở đầu xilanh.",
            "Dùng tay kia ấn mạnh pít-tông vào trong rồi thả tay ra."
          ],
          "expected_outcome": "Pít-tông dịch chuyển vào được một đoạn (không khí bị nén), khi buông tay pít-tông tự bật lùi ra như chiếc lò xo.",
          "safety_notes": "Tháo bỏ hoàn toàn kim tiêm trước khi cho trẻ làm thí nghiệm."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Đặc điểm nào dưới đây ĐÚNG với không khí trong lành quanh ta?",
        "options": [
          {
            "id": "A",
            "text": "Có màu xanh da trời và mùi thơm ngát"
          },
          {
            "id": "B",
            "text": "Trong suốt, không màu, không mùi và không có hình dạng cố định"
          },
          {
            "id": "C",
            "text": "Đặc cứng như một khối đá"
          },
          {
            "id": "D",
            "text": "Có vị ngọt như nước đường"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Hàng ngày con hít thở không khí vào phổi có nhìn thấy màu sắc hay ngửi thấy mùi gì đặc trưng không?"
          }
        ],
        "explanation": "Không khí nguyên chất là chất khí trong suốt, không màu, không mùi, không vị."
      }
    ]
  },
  {
    "grade": 3,
    "tier": "primary",
    "topicTitle": "Trọng lực và sự rơi của các vật",
    "slug": "lop-3-trong-luc-su-roi",
    "topicDescription": "Trái Đất hút mọi vật về phía tâm của nó, làm cho đồ vật luôn rơi xuống đất.",
    "icon": "ArrowDown",
    "lessonTitle": "Vì sao quả táo rụng rơi xuống đất?",
    "lessonSlug": "qua-tao-rung-roi-xuong-dat",
    "contentMarkdown": "# Lực hút kỳ diệu của Trái Đất\n\nNhà bác học Isaac Newton từng ngồi dưới gốc cây và thấy quả táo rụng rơi xuống đất:\n- Khi ta ném một quả bóng lên trời, quả bóng bay lên cao rồi lại **rơi xuống đất**.\n- Nước trên thác ghềnh luôn chảy từ đỉnh núi cao xuống chân núi thấp.\n- Tất cả là nhờ **Trọng lực** - lực hút của Trái Đất kéo mọi vật về phía tâm của nó!\n\nNhờ có lực hút của Trái Đất, con người và nhà cửa mới đứng vững trên mặt đất mà không bị bay lơ lửng vào vũ trụ.",
    "summary": "Trái Đất hút mọi vật thể bằng trọng lực, kéo các vật rơi xuống mặt đất.",
    "durationMinutes": 15,
    "parentGuide": {
      "summary": "Giới thiệu khái niệm trọng lực một cách trực quan, giúp trẻ hiểu vì sao đồ vật luôn có xu hướng rơi xuống dưới.",
      "misconceptions": [
        "Trẻ nghĩ đồ vật tự nó muốn rơi xuống đất chứ không có lực nào kéo nó.",
        "Trẻ nghĩ các phi hành gia trên trạm vũ trụ không bị rơi là do không có trọng lực hoàn toàn."
      ],
      "guiding_questions": [
        "Nếu con thả chiếc bút chì trên tay ra, chiếc bút sẽ bay vút lên trần nhà hay rơi xuống sàn?",
        "Điều gì sẽ xảy ra nếu Trái Đất bỗng nhiên mất đi lực hút đối với con người?"
      ],
      "home_experiments": [
        {
          "title": "Cuộc đua rơi tự do: Tờ giấy phẳng và viên giấy vo tròn",
          "materials": [
            "2 tờ giấy A4 giống hệt nhau"
          ],
          "steps": [
            "Giữ nguyên 1 tờ giấy phẳng, tờ giấy còn lại vo tròn thật chặt thành viên bi giấy.",
            "Cầm 2 vật ở cùng một độ cao khoảng 1.5 mét rồi cùng lúc buông tay.",
            "Quan sát vật nào chạm đất trước."
          ],
          "expected_outcome": "Viên giấy vo tròn rơi nhanh chạm đất trước, tờ giấy phẳng chao đảo rơi chậm hơn do lực cản của không khí tác dụng lên diện tích lớn.",
          "safety_notes": "Thả vật ở độ cao an toàn trong phòng khách."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Lực nào kéo quả bóng rơi xuống sân sau khi em sút bóng bay lên không trung?",
        "options": [
          {
            "id": "A",
            "text": "Lực từ của thanh nam châm"
          },
          {
            "id": "B",
            "text": "Trọng lực (lực hút của Trái Đất)"
          },
          {
            "id": "C",
            "text": "Lực đẩy của làn gió"
          },
          {
            "id": "D",
            "text": "Lực ma sát của cỏ"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Hành tinh của chúng ta luôn hút mọi vật hướng về phía mặt đất."
          }
        ],
        "explanation": "Trọng lực là lực hút của Trái Đất tác dụng lên mọi vật thể quanh nó."
      }
    ]
  },
  {
    "grade": 4,
    "tier": "primary",
    "topicTitle": "Sự truyền âm thanh qua các môi trường",
    "slug": "lop-4-am-thanh-truyen-qua-moi-truong",
    "topicDescription": "Âm thanh truyền được qua chất rắn, chất lỏng và chất khí; không truyền được trong chân không.",
    "icon": "Speaker",
    "lessonTitle": "Âm thanh đi qua đâu?",
    "lessonSlug": "am-thanh-di-qua-dau",
    "contentMarkdown": "# Con đường truyền đi của âm thanh\n\nÂm thanh không tự nhiên nhảy qua không gian mà phải nhờ các hạt vật chất truyền dao động:\n- **Chất rắn**: Truyền âm nhanh và rõ nhất. Khi áp tai xuống mặt bàn gỗ và gõ nhẹ ở đầu kia, ta nghe thấy tiếng gõ rất to!\n- **Chất lỏng**: Cá dưới nước vẫn nghe thấy tiếng động trên bờ để bơi trốn.\n- **Chất khí**: Không khí truyền tiếng nói của thầy cô đến tai học sinh.\n- **Chân không**: Nơi hoàn toàn không có không khí như ngoài vũ trụ sâu thẳm, âm thanh **không thể truyền đi**!",
    "summary": "Âm thanh truyền qua chất rắn, lỏng, khí nhưng không truyền được trong chân không.",
    "durationMinutes": 15,
    "parentGuide": {
      "summary": "Giúp học sinh hiểu môi trường truyền âm và vì sao trong chân không vũ trụ các phi hành gia phải dùng bộ đàm.",
      "misconceptions": [
        "Học sinh nghĩ âm thanh truyền trong không khí nhanh hơn trong thanh thép hoặc mặt bàn gỗ.",
        "Học sinh xem phim viễn tưởng thấy tàu vũ trụ nổ ầm ầm ngoài không gian và nghĩ chân không cũng có tiếng nổ."
      ],
      "guiding_questions": [
        "Khi con áp tai xuống mặt bàn, tiếng gõ ngón tay nghe to và rõ hơn hay nhỏ hơn so với nghe qua không khí?",
        "Tại sao các phi hành gia ngoài vũ trụ không thể mở kính mũ ra nói chuyện trực tiếp với nhau?"
      ],
      "home_experiments": [
        {
          "title": "Chiếc đồng hồ tích tắc qua mặt bàn",
          "materials": [
            "1 chiếc đồng hồ cơ có kim giây tích tắc hoặc điện thoại phát nhạc nhỏ",
            "Mặt bàn gỗ dài"
          ],
          "steps": [
            "Đặt đồng hồ ở một đầu bàn, đứng cách xa 1 mét nghe qua không khí (rất khó nghe thấy tiếng tích tắc).",
            "Áp một bên tai sát vào mặt bàn gỗ và lắng nghe lại."
          ],
          "expected_outcome": "Tiếng tích tắc truyền qua chất rắn của mặt bàn gỗ nghe to, đanh và rõ hơn hẳn qua không khí.",
          "safety_notes": "Áp tai nhẹ nhàng vào mặt bàn sạch sẽ."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Môi trường nào dưới đây KHÔNG THỂ truyền được âm thanh?",
        "options": [
          {
            "id": "A",
            "text": "Nước trong bể bơi"
          },
          {
            "id": "B",
            "text": "Chân không ngoài vũ trụ"
          },
          {
            "id": "C",
            "text": "Tường bê tông của ngôi nhà"
          },
          {
            "id": "D",
            "text": "Không khí trong phòng học"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Nơi hoàn toàn không có bất kỳ hạt vật chất nào để truyền dao động sóng âm."
          }
        ],
        "explanation": "Trong chân không không có các phân tử vật chất nên sóng âm không thể lan truyền."
      }
    ]
  },
  {
    "grade": 4,
    "tier": "primary",
    "topicTitle": "Sự dẫn nhiệt và vật liệu cách nhiệt",
    "slug": "lop-4-su-dan-nhiet-cach-nhiet",
    "topicDescription": "Phân biệt vật dẫn nhiệt tốt (kim loại) và vật dẫn nhiệt kém/cách nhiệt (gỗ, nhựa, xốp, len).",
    "icon": "Flame",
    "lessonTitle": "Vật dẫn nhiệt và vật cách nhiệt",
    "lessonSlug": "vat-dan-nhiet-cach-nhiet",
    "contentMarkdown": "# Nhiệt truyền từ vật này sang vật khác\n\nCác vật liệu quanh ta có khả năng dẫn nhiệt rất khác nhau:\n- **Vật dẫn nhiệt tốt**: Nhôm, đồng, sắt, inox. Vì thế nồi niêu xoong chảo làm bằng nhôm để nấu thức ăn nhanh chín.\n- **Vật dẫn nhiệt kém (vật cách nhiệt)**: Gỗ, nhựa, cao su, xốp, bông, len, thủy tinh. Vì thế quai xoong thường bọc nhựa hoặc gỗ để ta cầm vào không bị bỏng tay.\n\nMùa đông ta đắp chăn bông dày vì lớp bông xốp chứa nhiều không khí cách nhiệt giúp giữ nhiệt ấm cho cơ thể!",
    "summary": "Kim loại dẫn nhiệt tốt. Gỗ, nhựa, len, xốp cách nhiệt tốt giúp giữ nhiệt hoặc tránh bỏng.",
    "durationMinutes": 15,
    "parentGuide": {
      "summary": "Giúp trẻ hiểu tính chất truyền nhiệt của vật liệu và nguyên lý bảo quản nhiệt trong phích nước, bình giữ nhiệt gia đình.",
      "misconceptions": [
        "Trẻ nghĩ chiếc chăn bông ấm là chiếc chăn tự sinh ra hơi nóng giống như lò sưởi.",
        "Trẻ sờ vào thanh sắt thấy lạnh hơn mẩu gỗ và nghĩ nhiệt độ của thanh sắt thấp hơn mẩu gỗ trong cùng phòng."
      ],
      "guiding_questions": [
        "Tại sao lòng xoong nấu canh lại bằng kim loại còn quai cầm lại bọc nhựa chống nóng?",
        "Vì sao chiếc bình giữ nhiệt có thể giữ cho nước đá lâu tan và nước chè lâu nguội?"
      ],
      "home_experiments": [
        {
          "title": "Cuộc đua dẫn nhiệt của 3 chiếc thìa",
          "materials": [
            "1 chiếc thìa kim loại",
            "1 chiếc thìa nhựa",
            "1 chiếc thìa gỗ",
            "1 cốc nước ấm nóng khoảng 50 độ C"
          ],
          "steps": [
            "Cắm cả 3 chiếc thìa cùng lúc vào cốc nước nóng.",
            "Chờ khoảng 2 phút, chạm tay lần lượt vào đầu cán của 3 chiếc thìa phía trên."
          ],
          "expected_outcome": "Cán thìa kim loại nóng lên nhanh nhất, cán thìa nhựa chỉ hơi ấm, còn cán thìa gỗ hầu như không nóng.",
          "safety_notes": "Dùng nước ấm nóng vừa phải, có sự giám sát của phụ huynh."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Vì sao quai nồi nấu canh bằng kim loại thường được bọc một lớp nhựa chịu nhiệt?",
        "options": [
          {
            "id": "A",
            "text": "Để làm nồi nặng hơn và đứng vững hơn"
          },
          {
            "id": "B",
            "text": "Vì nhựa cách nhiệt tốt, giúp người nấu không bị bỏng tay khi nhấc nồi"
          },
          {
            "id": "C",
            "text": "Để thức ăn trong nồi nhanh sôi hơn"
          },
          {
            "id": "D",
            "text": "Để trang trí cho chiếc nồi đổi màu đẹp mắt"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Nhựa là vật dẫn nhiệt tốt hay dẫn nhiệt kém (cách nhiệt)?"
          }
        ],
        "explanation": "Nhựa dẫn nhiệt kém nên ngăn nhiệt lượng từ thân nồi truyền vào tay người cầm."
      }
    ]
  },
  {
    "grade": 4,
    "tier": "primary",
    "topicTitle": "Năng lượng điện & Mạch điện thắp sáng",
    "slug": "lop-4-mach-dien-thap-sang",
    "topicDescription": "Tìm hiểu nguồn điện (pin), dây dẫn, bóng đèn và công tắc tạo thành mạch điện kín.",
    "icon": "Lightbulb",
    "lessonTitle": "Làm thế nào để bóng đèn sáng?",
    "lessonSlug": "lam-the-nao-den-sang",
    "contentMarkdown": "# Khám phá mạch điện kín\n\nĐiện năng là nguồn năng lượng quan trọng thắp sáng và vận hành các thiết bị:\n- **Nguồn điện**: Pin tiểu, bình ắc quy cung cấp năng lượng điện. Pin có cực dương ($+$) và cực âm ($-$).\n- **Mạch điện kín**: Để bóng đèn sáng, dòng điện phải đi ra từ một cực của pin, qua dây dẫn đến bóng đèn, rồi quay trở về cực kia của pin tạo thành vòng khép kín.\n- **Công tắc**: Khi đóng công tắc thì mạch kín $\\rightarrow$ đèn sáng; khi ngắt công tắc thì mạch hở $\\rightarrow$ đèn tắt.",
    "summary": "Mạch điện kín gồm nguồn điện (pin), dây dẫn và bóng đèn. Công tắc dùng để đóng ngắt mạch điện.",
    "durationMinutes": 15,
    "parentGuide": {
      "summary": "Dạy trẻ nguyên lý mạch điện một chiều an toàn bằng pin tiểu và giáo dục quy tắc an toàn không nghịch ổ điện 220V.",
      "misconceptions": [
        "Trẻ nghĩ chỉ cần nối một dây duy nhất từ cực dương pin vào bóng đèn là đèn sẽ tự sáng.",
        "Trẻ nghĩ điện từ ổ cắm trên tường cũng yếu và an toàn như pin đồ chơi."
      ],
      "guiding_questions": [
        "Đố con trên chiếc đèn pin bỏ túi, khi con ấn nút bật thì điều gì bên trong đã làm đèn phát sáng?",
        "Vì sao chúng ta tuyệt đối không bao giờ được dùng que sắt chọc vào ổ cắm điện trong nhà?"
      ],
      "home_experiments": [
        {
          "title": "Thắp sáng bóng đèn LED bằng quả pin tiểu",
          "materials": [
            "1 viên pin tiểu 1.5V (AA hoặc AAA)",
            "1 bóng đèn LED nhỏ",
            "2 mẩu dây đồng nhỏ có bọc nhựa"
          ],
          "steps": [
            "Tuốt vỏ nhựa ở 2 đầu mỗi đoạn dây đồng.",
            "Nối 1 đầu dây vào cực dương của pin, 1 đầu dây vào cực âm của pin.",
            "Chạm 2 đầu dây còn lại vào 2 chân của bóng đèn LED (nếu không sáng thì đảo chiều 2 chân đèn)."
          ],
          "expected_outcome": "Khi cả 2 đầu dây chạm đúng cực tạo thành mạch kín, bóng đèn LED sáng rực rỡ.",
          "safety_notes": "Chỉ làm thí nghiệm với pin tiểu 1.5V, tuyệt đối không đấu vào nguồn điện gia đình."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Để bóng đèn pin phát sáng, mạch điện bắt buộc phải ở trạng thái nào?",
        "options": [
          {
            "id": "A",
            "text": "Mạch hở bị đứt dây"
          },
          {
            "id": "B",
            "text": "Mạch điện kín nối liền từ cực này qua đèn sang cực kia của pin"
          },
          {
            "id": "C",
            "text": "Pin đã bị chảy nước cạn kiệt"
          },
          {
            "id": "D",
            "text": "Công tắc đang mở ngắt quãng"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Dòng điện cần một con đường khép kín hoàn chỉnh để lưu thông tuần hoàn."
          }
        ],
        "explanation": "Dòng điện chỉ chạy được trong mạch điện kín hoàn chỉnh."
      }
    ]
  },
  {
    "grade": 5,
    "tier": "primary",
    "topicTitle": "Năng lượng mặt trời, gió và nước chảy",
    "slug": "lop-5-nang-luong-tai-tao",
    "topicDescription": "Các nguồn năng lượng tái tạo sạch từ thiên nhiên: pin mặt trời, cối xay gió và thủy điện.",
    "icon": "SunMedium",
    "lessonTitle": "Năng lượng sạch từ thiên nhiên",
    "lessonSlug": "nang-luong-sach-tu-nhien",
    "contentMarkdown": "# Nguồn năng lượng vô tận quanh ta\n\nCon người ngày nay đang khai thác năng lượng tái tạo sạch để bảo vệ môi trường Trái Đất:\n- **Năng lượng Mặt Trời**: Cung cấp ánh sáng và nhiệt sưởi ấm, pin mặt trời biến quang năng thành điện năng thắp sáng đường phố.\n- **Năng lượng gió**: Đẩy thuyền buồm, quay các cánh quạt tuabin gió khổng lồ để phát điện sạch.\n- **Năng lượng nước chảy**: Dòng nước lũ đổ từ trên đập cao xuống làm quay tuabin trong các nhà máy thủy điện sinh ra dòng điện.",
    "summary": "Mặt Trời, gió và nước chảy là các nguồn năng lượng tái tạo sạch, vô tận và thân thiện với môi trường.",
    "durationMinutes": 15,
    "parentGuide": {
      "summary": "Giáo dục học sinh ý thức sử dụng năng lượng xanh và bảo vệ tài nguyên thiên nhiên của hành tinh xanh.",
      "misconceptions": [
        "Học sinh nghĩ than đá và dầu mỏ có thể tự sinh ra mãi mãi và dùng bao nhiêu cũng không hết.",
        "Học sinh nghĩ pin mặt trời chỉ hoạt động vào mùa hè còn mùa đông thì hoàn toàn vô dụng."
      ],
      "guiding_questions": [
        "Tại sao người ta khuyên nên lợp các tấm pin mặt trời trên mái nhà thay vì chạy máy phát điện bằng xăng dầu?",
        "Nhà máy thủy điện dùng sức mạnh của cái gì để làm quay máy phát điện?"
      ],
      "home_experiments": [
        {
          "title": "Chiếc guồng nước bằng vỏ chai nhựa",
          "materials": [
            "1 vỏ chai nhựa",
            "1 chiếc que xiên tre",
            "Vòi nước bồn rửa bát"
          ],
          "steps": [
            "Cắt các cánh nhỏ trên thân chai nhựa để tạo thành guồng cánh quạt.",
            "Xỏ que tre qua tâm chai làm trục quay.",
            "Mở vòi nước xả trực tiếp vào các cánh quạt và quan sát guồng nước quay tít."
          ],
          "expected_outcome": "Dòng nước chảy có động năng đập vào các cánh quạt làm trục quay tít, minh họa nguyên lý nhà máy thủy điện.",
          "safety_notes": "Cẩn thận khi dùng kéo cắt chai nhựa tránh xước tay."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Nguồn năng lượng nào sau đây là nguồn năng lượng tái tạo sạch, không gây ô nhiễm khói bụi?",
        "options": [
          {
            "id": "A",
            "text": "Đốt than đá trong lò luyện gang"
          },
          {
            "id": "B",
            "text": "Năng lượng từ ánh sáng Mặt Trời"
          },
          {
            "id": "C",
            "text": "Chạy động cơ xe máy bằng xăng pha nhớt"
          },
          {
            "id": "D",
            "text": "Đốt dầu hỏa thắp đèn"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Nguồn năng lượng này chiếu sáng tự nhiên ban ngày và không thải ra khí độc hại."
          }
        ],
        "explanation": "Ánh sáng Mặt Trời là nguồn năng lượng tái tạo sạch và dồi dào nhất trên Trái Đất."
      }
    ]
  },
  {
    "grade": 5,
    "tier": "primary",
    "topicTitle": "An toàn điện và tiết kiệm năng lượng điện",
    "slug": "lop-5-an-toan-dien",
    "topicDescription": "Kỹ năng sử dụng điện an toàn, phòng tránh giật điện, chập cháy và cách tiết kiệm điện.",
    "icon": "ShieldAlert",
    "lessonTitle": "Bảo vệ mình trước dòng điện",
    "lessonSlug": "bao-ve-minh-truoc-dong-dien",
    "contentMarkdown": "# Điện năng hữu ích nhưng cần cẩn trọng\n\nDòng điện gia đình ($220\\text{V}$) có sức mạnh rất lớn và cực kỳ nguy hiểm nếu bất cẩn:\n- Cơ thể người và nước dẫn điện rất tốt, vì vậy **tuyệt đối không chạm tay ướt** vào công tắc hoặc phích cắm điện.\n- Không dùng que kim loại chọc vào ổ cắm, không chơi đùa gần trạm biến áp hay đường dây điện cao thế.\n- **Tiết kiệm điện**: Tắt quạt, tắt đèn khi ra khỏi phòng; tận dụng ánh sáng tự nhiên ban ngày giúp bảo vệ túi tiền gia đình và môi trường.",
    "summary": "Điện lưới 220V rất nguy hiểm. Cần tuân thủ quy tắc an toàn và có ý thức tiết kiệm điện.",
    "durationMinutes": 15,
    "parentGuide": {
      "summary": "Hình thành kỹ năng sống và phản xạ an toàn phòng tránh tai nạn điện giật và hỏa hoạn cho trẻ.",
      "misconceptions": [
        "Trẻ nghĩ chỉ khi nào sờ trực tiếp vào lõi đồng mới bị giật, còn tay ướt sờ vào vỏ nhựa nứt thì an toàn.",
        "Trẻ nghĩ để các thiết bị ở chế độ chờ (standby) cả ngày đêm không tốn điện."
      ],
      "guiding_questions": [
        "Vì sao vừa tắm xong tay chân còn ướt sũng, con tuyệt đối không được cắm phích quạt điện?",
        "Gia đình con có thể làm những hành động nhỏ nào để tiết kiệm hóa đơn tiền điện mỗi tháng?"
      ],
      "home_experiments": [
        {
          "title": "Khảo sát vật liệu cách điện trong ngôi nhà",
          "materials": [
            "Sổ tay nhỏ",
            "Bút ghi chép",
            "Cùng bố mẹ đi một vòng quanh nhà"
          ],
          "steps": [
            "Quan sát các phích cắm điện, dây điện, vỏ công tắc, kìm sửa điện.",
            "Ghi chép lại các bộ phận nào làm bằng kim loại dẫn điện và bộ phận nào bọc nhựa/cao su cách điện."
          ],
          "expected_outcome": "Trẻ nhận thức rõ mọi vị trí người dùng cầm nắm đều được bọc nhựa hoặc cao su cách điện an toàn.",
          "safety_notes": "Chỉ quan sát bằng mắt, không tự ý cắm rút phích điện đang hoạt động."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Hành động nào sau đây là AN TOÀN khi sử dụng điện trong gia đình?",
        "options": [
          {
            "id": "A",
            "text": "Cầm tay ướt cắm phích điện vào ổ cắm trên tường"
          },
          {
            "id": "B",
            "text": "Tắt đèn và rút phích cắm các thiết bị điện khi không sử dụng"
          },
          {
            "id": "C",
            "text": "Thả diều gần đường dây điện cao áp ngoài cánh đồng"
          },
          {
            "id": "D",
            "text": "Dùng dây thép chọc vào lỗ ổ cắm điện"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Hành động vừa đảm bảo an toàn vừa giúp tiết kiệm chi phí tiền điện."
          }
        ],
        "explanation": "Tắt thiết bị khi không dùng là hành vi sử dụng điện thông minh và an toàn."
      }
    ]
  },
  {
    "grade": 5,
    "tier": "primary",
    "topicTitle": "Biến đổi trạng thái của chất do nhiệt",
    "slug": "lop-5-bien-doi-trang-thai-nhiet",
    "topicDescription": "Hiện tượng nóng chảy, đông đặc, bay hơi và ngưng tụ của các chất dưới tác dụng của nhiệt độ.",
    "icon": "Sparkles",
    "lessonTitle": "Vòng biến hóa của vật chất",
    "lessonSlug": "vong-bien-hoa-vat-chat",
    "contentMarkdown": "# Sự biến đổi trạng thái kỳ thú\n\nNhiệt độ thay đổi làm các chất biến đổi thể trạng:\n- **Nóng chảy**: Chất rắn nhận nhiệt chuyển thành chất lỏng (nước đá tan thành nước, sáp nến chảy lỏng).\n- **Đông đặc**: Chất lỏng mất nhiệt chuyển thành chất rắn (nước đóng băng thành đá, sáp nguội cứng lại).\n- **Bay hơi**: Chất lỏng chuyển thành hơi (nước hồ bốc hơi, cồn sát khuẩn bay hơi nhanh).\n- **Ngưng tụ**: Hơi gặp lạnh chuyển thành chất lỏng (sương đọng trên lá cây buổi sớm, hơi nước bám trên gương).",
    "summary": "Nhiệt độ làm các chất chuyển thể qua 4 quá trình: nóng chảy, đông đặc, bay hơi và ngưng tụ.",
    "durationMinutes": 15,
    "parentGuide": {
      "summary": "Giúp học sinh tổng hợp và làm chủ 4 quá trình chuyển thể của vật chất, liên hệ với vòng tuần hoàn của nước trong tự nhiên.",
      "misconceptions": [
        "Học sinh nghĩ chỉ có nước mới có thể nóng chảy hoặc đông đặc, còn kim loại như sắt thép thì không bao giờ nóng chảy được.",
        "Học sinh nghĩ bay hơi chỉ xảy ra khi chất lỏng sôi ở $100^\\circ\\text{C}$."
      ],
      "guiding_questions": [
        "Giọt sương long lanh đọng trên ngọn cỏ buổi sớm mai từ đâu mà xuất hiện?",
        "Trong lò luyện kim, người ta đốt nóng quặng sắt lên hàng nghìn độ C để làm gì?"
      ],
      "home_experiments": [
        {
          "title": "Sự đông đặc kỳ diệu của ngọn nến",
          "materials": [
            "1 cây nến nhỏ",
            "1 chiếc đĩa sứ",
            "Bật lửa do bố mẹ giữ"
          ],
          "steps": [
            "Bố mẹ thắp ngọn nến, quan sát sáp nến gần bấc nến nóng chảy thành chất lỏng trong suốt.",
            "Nghiêng nhẹ cây nến để vài giọt sáp lỏng nhỏ xuống đĩa sứ.",
            "Quan sát giọt sáp trên đĩa nguội đi sau 10 giây."
          ],
          "expected_outcome": "Sáp lỏng mất nhiệt truyền vào đĩa sứ nhanh chóng đông đặc lại thành chất rắn màu trắng đục.",
          "safety_notes": "Phụ huynh trực tiếp châm lửa và theo dõi ngọn nến tránh hỏa hoạn."
        }
      ]
    },
    "questions": [
      {
        "question_type": "mcq",
        "prompt": "Hiện tượng nước lỏng trong khay để vào ngăn đá tủ lạnh biến thành các khối đá cứng gọi là gì?",
        "options": [
          {
            "id": "A",
            "text": "Sự nóng chảy"
          },
          {
            "id": "B",
            "text": "Sự đông đặc"
          },
          {
            "id": "C",
            "text": "Sự bay hơi"
          },
          {
            "id": "D",
            "text": "Sự ngưng tụ"
          }
        ],
        "correct_answer": "B",
        "difficulty": "easy",
        "points": 10,
        "hints": [
          {
            "level": 1,
            "hint": "Quá trình chuyển từ thể lỏng sang thể rắn khi giảm nhiệt độ."
          }
        ],
        "explanation": "Sự đông đặc là quá trình chất chuyển từ thể lỏng sang thể rắn."
      }
    ]
  }
];
