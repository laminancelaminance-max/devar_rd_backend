const mongoose = require('mongoose');
const Category = require('./models/Category');

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/renovation-app');

    // Clear existing data
    await Category.deleteMany({});

    // Create Bathroom Renovation with full data
    const bathroomCategory = new Category({
      name: 'Bathroom Renovation',
      description: 'Complete bathroom renovation services',
      icon: 'Bath',
      laborOnly: 11000,
      allInclusive: 17000,
      sections: [
        {
          name: 'Demolition',
          description: 'Existing shower walls all around, Shower Tiles, Bathroom floor, shower base and Toilet.',
          subItems: []
        },
        {
          name: 'Construction',
          description: 'Cement board, waterproof spackling and Tiling for shower walls.',
          subItems: ['Bench and Niche inside shower']
        },
        {
          name: 'Plumbing',
          description: 'Replumbing of hot and cold water lines for Shower, drain and plumbing for Front shower system',
          subItems: []
        },
        {
          name: 'Tiling',
          description: 'Entire Bathroom shower wall all sides (no ceiling), Shower Floor, Niche and Bench',
          subItems: []
        },
        {
          name: 'Installation',
          description: 'Shower system, Replace and Install Exhaust for bathroom, Replace existing bathroom handbars (towel rack and toilet sheet holder), Faucets, Door moldings, Mirror',
          subItems: []
        },
        {
          name: 'Flooring',
          description: '',
          subItems: [
            'Finish entire floor with concrete mix',
            'Install tiles with separators',
            'Finish tiles with Grout'
          ]
        },
        {
          name: 'Paint',
          description: 'Entire bathroom walls, ceiling and door moldings.',
          subItems: []
        },
        {
          name: 'Electric',
          description: '',
          subItems: [
            'Light in front of the shower in the ceiling',
            'Direct power light for mirror',
            'Replacement of existing Vanity light, all switches and outlets'
          ]
        },
        {
          name: 'Garbage Removal',
          description: 'Removal of all garbage and construction debris produced from the work. Packaging materials and wood pallets are not included.',
          subItems: []
        }
      ],
      items: [
        { name: 'Cement board', maxCoverage: '' },
        { name: 'Versabond Concrete mix', maxCoverage: '' },
        { name: 'Plumbing', maxCoverage: '' },
        { name: 'Shower doors', maxCoverage: '$600' },
        { name: 'Vanity', maxCoverage: '$500' },
        { name: 'Tiles (Shower Walls and Shower floor)', maxCoverage: '$2/sqft' },
        { name: 'Spackle', maxCoverage: '' },
        { name: 'Paint Walls (Bath and Spa)', maxCoverage: '$85/G' },
        { name: 'Paint ceiling (Bath and Spa)', maxCoverage: '$50/G' },
        { name: 'Faucet', maxCoverage: '$60' },
        { name: 'Grout, Pencils, Corners, Saddles', maxCoverage: '' },
        { name: 'Mirror', maxCoverage: '$120' },
        { name: 'Vanity Light', maxCoverage: '$120' },
        { name: 'Shower system', maxCoverage: '$150' },
        { name: 'Toilets', maxCoverage: '$120' },
        { name: 'Moldings, Misc', maxCoverage: '' },
        { name: 'Exhaust', maxCoverage: '$65' }
      ]
    });

    await bathroomCategory.save();

    // Create Kitchen Renovation
    const kitchenCategory = new Category({
      name: 'Kitchen Renovation',
      description: 'Complete kitchen remodeling',
      icon: 'Coffee',
      laborOnly: 15000,
      allInclusive: 25000,
      sections: [
        {
          name: 'Demolition',
          description: 'Remove existing cabinets, countertops, and appliances',
          subItems: []
        },
        {
          name: 'Cabinetry',
          description: 'Install new custom cabinets',
          subItems: ['Soft-close hinges', 'Pull-out shelves']
        }
      ],
      items: [
        { name: 'Cabinets', maxCoverage: '$3000' },
        { name: 'Countertops', maxCoverage: '$1500' }
      ]
    });

    await kitchenCategory.save();

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();