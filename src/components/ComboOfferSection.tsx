import React from 'react';

interface ComboOfferSectionProps {
  onNavigate: (page: string) => void;
}

const ComboOfferSection: React.FC<ComboOfferSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Special Combo Offers
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Save more when you buy together
          </p>
          <button
            onClick={() => onNavigate('products')}
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View All Offers
          </button>
        </div>
      </div>
    </section>
  );
};

export default ComboOfferSection;