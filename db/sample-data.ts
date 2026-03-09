import { hashSync } from 'bcrypt-ts-edge';

const sampleData = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: hashSync('123456', 10),
      role: 'admin',
    },
    {
      name: 'Jane',
      email: 'jane@example.com',
      password: hashSync('123456', 10),
      role: 'user',
    },
    {
      name: 'ServoMotor',
      email: 'sales@panasonicservomotor.com',
      password: hashSync('123456', 10),
      role: 'admin',
    },
  ],

  products: [
    {
      "name": "6ES7 515-2AN03-0AB0",
      "slug": "6es7515-2an03-0ab0",
      "category": "Siemens",
      "description": "S7-1500 CPU 1515-2 PN Sealed",
      "images": [
        "https://sanityimages.s3.amazonaws.com/6es7153-4aa01-0xb0.webp",
        "https://sanityimages.s3.amazonaws.com/IMG_0564.webp"
      ],
      "price": 1616.9,
      "brand": "Siemens",
      "rating": 4.3,
      "numReviews": 26,
      "stock": 8,
      "isFeatured": false,
      "banner": null
    },
    {
      "name": "6ES7 315-2EH14-0AB0",
      "slug": "6es7315-2eh14-0ab0",
      "category": "Siemens",
      "description": "S7-300 CPU 315-2 PN/DP New in open package",
      "images": [
        "https://sanityimages.s3.amazonaws.com/IMG_4893.webp",
        "https://sanityimages.s3.amazonaws.com/6ES7331-7KF02-0AB0.webp"
      ],
      "price": 1380.44,
      "brand": "Siemens",
      "rating": 4.2,
      "numReviews": 30,
      "stock": 2,
      "isFeatured": true,
      "banner": null
    },
    {
      "name": "6ES7 512-1SK01-0AB0",
      "slug": "6es7512-1sk01-0ab0",
      "category": "Siemens",
      "description": "ET 200SP CPU 1512SP F-1 PN Sealed",
      "images": [
        "https://sanityimages.s3.amazonaws.com/IMG_6364.webp",
        "https://sanityimages.s3.amazonaws.com/IMG_8406.webp"
      ],
      "price": 704.62,
      "brand": "Siemens",
      "rating": 4.8,
      "numReviews": 49,
      "stock": 3,
      "isFeatured": true,
      "banner": null
    },
    {
      "name": "6GK5 216-0BA00-2AC2",
      "slug": "6gk5216-0ba00-2ac2",
      "category": "Siemens",
      "description": "SCALANCE SCALANCE XC216 Sealed",
      "images": [
        "https://sanityimages.s3.amazonaws.com/DC2800.png",
        "https://sanityimages.s3.amazonaws.com/IMG_0257.webp"
      ],
      "price": 662.97,
      "brand": "Siemens",
      "rating": 4.5,
      "numReviews": 20,
      "stock": 2,
      "isFeatured": true,
      "banner": null
    },
    {
      "name": "6GK7 343-1EX30-0XE0",
      "slug": "6gk7343-1ex30-0xe0",
      "category": "Siemens",
      "description": "S7-300 SIMATIC S7-300 CP 343-1 Sealed",
      "images": [
        "https://sanityimages.s3.amazonaws.com/IMG_0315.webp",
        "https://sanityimages.s3.amazonaws.com/IMG_0259.webp"
      ],
      "price": 1002.54,
      "brand": "Siemens",
      "rating": 4.9,
      "numReviews": 9,
      "stock": 1,
      "isFeatured": true,
      "banner": null
    },
    {
      "name": "6AV2 124-0UC02-0AX1",
      "slug": "6av2124-0uc02-0ax1",
      "category": "Siemens",
      "description": "Siemens HMI TP1900 Comfort Sealed",
      "images": [
        "https://sanityimages.s3.amazonaws.com/IMG_2604.webp",
        "https://sanityimages.s3.amazonaws.com/IMG_6345.webp"
      ],
      "price": 2481.45,
      "brand": "Siemens",
      "rating": 4.2,
      "numReviews": 48,
      "stock": 2,
      "isFeatured": true,
      "banner": null
    },
  ],
};

export default sampleData;
