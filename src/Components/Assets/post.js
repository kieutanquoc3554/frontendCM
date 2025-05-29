let all_post = [
  {
    id: 1,
    name: "Khô cá sặc rằn U Minh, Lạt vừa ăn, Con to làm quà",
    description:
      "Khô cá sặc lạt vừa ăn, không mặn không cứng. Cá to đẹp thích hợp làm quà biếu, tặng. KHÔNG chất bảo quản, KHÔNG phẩm màu. Cá khô hẳn có thể mang đi xa, đi nước ngoài. Miễn phí giao hàng TPHCM khi mua từ 2kg. Giao hàng và thu tiền tận nơi TOÀN QUỐC.",
    category: "driedFish",
    rating: 2,
    createdAt: "2024-09-01T10:00:00Z",
    details: [
      {
        weight: 500,
        quantity: 100,
        unit: "g",
        price: 150000,
      },
      {
        weight: 1,
        quantity: 280,
        unit: "kg",
        price: 300000,
      },
      {
        weight: 2,
        quantity: 550,
        unit: "kg",
        price: 550000,
      },
    ],
    images: [
      {
        url: "https://dacsanmuicamau.com/static/product/2019/0806/kho-ca-sac-ran-379_thumb_500x0.jpg",
        description: "Anchovy packed in sealed bags.",
      },
    ],
  },
  {
    id: 2,
    name: "Tôm khô Cà Mau - Làm từ tôm đất - Làm thủ công - Màu tự nhiên",
    description:
      "Tôm khô làm THỦ CÔNG từ tôm đất sống. Xuất xứ: Rạch Gốc, Năm Căn - Cà Mau.",
    category: "driedShrimp",
    rating: 4,
    createdAt: "2024-08-30T12:30:00Z",
    details: [
      {
        weight: 1,
        quantity: 50,
        unit: "kg",
        price: 1600000,
      },
    ],
    images: [
      {
        url: "https://dacsanmuicamau.com/static/product/2018/0802/tom-kho-loai-dac-biet-568_thumb_500x0.jpg",
        description: "Large-sized dried shrimp.",
      },
    ],
  },
  {
    id: 3,
    name: "Bánh phồng tôm Cà Mau loại đặc biệt",
    description:
      "Loại bánh đặc biệt với tỉ lệ tôm hơn 50%. Được làm từ tôm đất sống vùng sinh thái. Bánh có hình vuông góc cạnh đặc thù.",
    category: "prawnCrackers",
    rating: 4.2,
    createdAt: "2024-09-05T08:00:00Z",
    details: [
      {
        weight: 500,
        quantity: 70,
        unit: "g",
        price: 160000,
      },
    ],
    images: [
      {
        url: "https://dacsanmuicamau.com/static/product/2024/0819/bpt-vhp-db-tn43-379_thumb_500x0.jpg",
        description: "Spicy prawn crackers in a sealed package.",
      },
    ],
  },
  {
    id: 4,
    name: "Mật ong ruồi loại tự nhiên, nguyên chất",
    description: "Mật ong thật 100%; Hoàn tiền nếu mật giả.",
    category: "honey",
    rating: 4.9,
    createdAt: "2024-08-20T15:00:00Z",
    details: [
      {
        weight: 500,
        quantity: 30,
        unit: "ml",
        price: 600000,
      },
    ],
    images: [
      {
        url: "https://dacsanmuicamau.com/static/product/2019/0221/mat-ong-ruoi-717_thumb_500x0.jpg",
        description: "Pure honey in glass bottles.",
      },
    ],
  },
  {
    id: 5,
    name: "Bánh phồng chay vị chuối Cà Mau, Thơm ngon, ăn nghiền",
    description:
      "Bánh phồng tôm chay vị chuối Cà Mau thơm ngon. Xuất xứ: Năm Căn, Cà Mau. Bánh có vị chuối đặc trưng thơm ngon không ngán.",
    category: "candy",
    rating: 4.6,
    createdAt: "2024-08-25T09:30:00Z",
    details: [
      {
        weight: 500,
        quantity: 150,
        unit: "g",
        price: 90000,
      },
    ],
    images: [
      {
        url: "https://dacsanmuicamau.com/static/product/2019/0225/banh-phong-chuoi-ca-mau-377_thumb_500x0.jpg",
        description: "Coconut candy in a small box.",
      },
    ],
  },
  {
    id: 6,
    name: "Mắm ba khía chính gốc Cà Mau - Nhà làm - Loại nguyên con và đã trộn",
    description:
      "Mắm ba khía Rạch Gốc - Cà Mau. Được chế biến Thủ công - Truyền thống",
    category: "fermentedFishSauce",
    rating: 4.8,
    createdAt: "2024-09-02T14:00:00Z",
    details: [
      {
        weight: 600,
        quantity: 40,
        unit: "g",
        price: 175000,
      },
    ],
    images: [
      {
        url: "https://dacsanmuicamau.com/static/product/2018/0819/loai-mam-ba-khia-ca-mau-186_thumb_500x0.jpg",
        description: "Fermented fish sauce in glass bottles.",
      },
    ],
  },
  {
    id: 7,
    name: "Rượu trái giác, Đặc sản trứ danh Cà Mau",
    description:
      "Rượu trái giác đặc sản trứ danh Cà Mau. Loại chai 30% vol giá 250.000đ. Xuất xứ: rừng U Minh hạ, Cà Mau",
    category: "more",
    rating: 4.3,
    createdAt: "2024-08-28T16:45:00Z",
    details: [
      {
        weight: 750,
        quantity: 80,
        unit: "ml",
        price: 250000,
      },
    ],
    images: [
      {
        url: "https://dacsanmuicamau.com/static/product/2019/0825/ruou-trai-giac-514_thumb_500x0.jpg",
        description: "Mixed dried seafood in a vacuum-sealed package.",
      },
    ],
  },
  {
    id: 8,
    name: "Khô cá chạch đồng loại 1 - vừa ăn, thơm, béo, dai",
    description: "Khô cá chạch đồng 100% tự nhiên. Làm thủ công HOÀN TOÀN.",
    category: "driedFish",
    rating: 4.7,
    createdAt: "2024-09-03T11:00:00Z",
    details: [
      {
        weight: 1,
        quantity: 60,
        unit: "kg",
        price: 700000,
      },
    ],
    images: [
      {
        url: "https://dacsanmuicamau.com/static/product/2021/1106/kho-ca-chach-dong-size-vip-640_thumb_500x0.jpg",
        description: "Premium dried fish.",
      },
    ],
  },
  {
    id: 9,
    name: "Tôm khô xẻ (tôm lụi Cà Mau), Tôm thẻ tự nhiên, Chế biến thủ công",
    description:
      "Tôm khô xẻ lụi Cà Mau 500gr. Nguyên liệu: Tôm thẻ, sú tự nhiên loại to nhất.",
    category: "driedShrimp",
    rating: 4.4,
    createdAt: "2024-08-26T13:00:00Z",
    details: [
      {
        weight: 500,
        quantity: 120,
        unit: "g",
        price: 700000,
      },
    ],
    images: [
      {
        url: "https://dacsanmuicamau.com/static/product/2021/0515/tom-the-xe-379_thumb_500x0.jpg",
        description: "Small dried shrimp.",
      },
    ],
  },
  {
    id: 10,
    name: "Bánh phồng tôm Cà Mau loại thượng hạng",
    description:
      "Loại bánh đặc biệt với tỉ lệ tôm hơn 30%. Được làm từ tôm đất sống vùng sinh thái.",
    category: "prawnCrackers",
    rating: 4.1,
    createdAt: "2024-09-06T07:00:00Z",
    details: [
      {
        weight: 500,
        quantity: 90,
        unit: "g",
        price: 110000,
      },
    ],
    images: [
      {
        url: "https://dacsanmuicamau.com/static/product/2019/0225/banh-phong-tom-ca-mau-cao-cap-300_thumb_500x0.jpg",
        description: "Classic prawn crackers in a bag.",
      },
    ],
  },
];

export default all_post;
