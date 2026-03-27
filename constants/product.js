export const categories = ['All', 'Kaptan', 'Zalmi', 'Panjeedar', 'Suede', 'Exclusive']

export const allProducts = Array.from({ length: 45 }, (_, i) => {
    const cat = categories[(i % 5) + 1]
    return {
        id: i + 1,
        name: `Zilber ${cat} - Edition ${i + 1}`,
        slug: `zilber-design-${i + 1}`, // Ye slug match hona chahiye
        category: cat,
        price: 8500 + (i * 150),
        isNew: i < 8,
        description: `This Zilber ${cat} edition is handcrafted with premium leather and traditional stitching techniques.`
    }
})