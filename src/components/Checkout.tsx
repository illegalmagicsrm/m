import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Banknote, Shield, MapPin } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Customer } from '../types';

interface CheckoutProps {
  onNavigate: (page: string) => void;
}

// Bangladesh districts and their thanas
const bangladeshData = {
  "Dhaka": ["Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar"],
  "Chittagong": ["Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari"],
  "Rajshahi": ["Bagha", "Bagmara", "Charghat", "Durgapur", "Godagari"],
  "Khulna": ["Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra"],
  "Barisal": ["Agailjhara", "Babuganj", "Bakerganj", "Banariparah", "Gaurnadi"],
  "Sylhet": ["Balaganj", "Beanibazar", "Bishwanath", "Companiganj", "Fenchuganj"],
  "Rangpur": ["Badarganj", "Gangachara", "Kaunia", "Mithapukur", "Pirgachha"],
  "Mymensingh": ["Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gouripur"],
  "Comilla": ["Barura", "Brahmanpara", "Burichang", "Chandina", "Chauddagram"],
  "Gazipur": ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"],
  "Narayanganj": ["Araihazar", "Bandar", "Narayanganj Sadar", "Rupganj", "Sonargaon"],
  "Tangail": ["Basail", "Bhuapur", "Delduar", "Ghatail", "Gopalpur"],
  "Jessore": ["Abhaynagar", "Bagherpara", "Chaugachha", "Jhikargachha", "Keshabpur"],
  "Bogra": ["Adamdighi", "Bogra Sadar", "Dhunat", "Dhupchanchia", "Gabtali"],
  "Dinajpur": ["Birampur", "Birganj", "Biral", "Bochaganj", "Chirirbandar"],
  "Kushtia": ["Bheramara", "Daulatpur", "Khoksa", "Kumarkhali", "Kushtia Sadar"],
  "Pabna": ["Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur"],
  "Faridpur": ["Alfadanga", "Bhanga", "Boalmari", "Charbhadrasan", "Faridpur Sadar"],
  "Jamalpur": ["Bakshiganj", "Dewanganj", "Islampur", "Jamalpur Sadar", "Madarganj"],
  "Kishoreganj": ["Austagram", "Bajitpur", "Bhairab", "Hossainpur", "Itna"],
  "Madaripur": ["Kalkini", "Madaripur Sadar", "Rajoir", "Shibchar"],
  "Manikganj": ["Daulatpur", "Ghior", "Harirampur", "Manikganj Sadar", "Saturia"],
  "Munshiganj": ["Gazaria", "Lohajang", "Munshiganj Sadar", "Serajdikhan", "Sreenagar"],
  "Narsingdi": ["Belabo", "Monohardi", "Narsingdi Sadar", "Palash", "Raipura"],
  "Rajbari": ["Baliakandi", "Goalandaghat", "Pangsha", "Rajbari Sadar"],
  "Shariatpur": ["Bhedarganj", "Damudya", "Gosairhat", "Naria", "Shariatpur Sadar"],
  "Cox's Bazar": ["Chakaria", "Cox's Bazar Sadar", "Kutubdia", "Maheshkhali", "Ramu"],
  "Feni": ["Chhagalnaiya", "Daganbhuiyan", "Feni Sadar", "Parshuram", "Sonagazi"],
  "Brahmanbaria": ["Akhaura", "Bancharampur", "Bijoynagar", "Brahmanbaria Sadar", "Kasba"],
  "Lakshmipur": ["Kamalnagar", "Lakshmipur Sadar", "Raipur", "Ramganj", "Ramgati"],
  "Noakhali": ["Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Kabirhat"],
  "Habiganj": ["Ajmiriganj", "Bahubal", "Baniyachong", "Chunarughat", "Habiganj Sadar"],
  "Moulvibazar": ["Barlekha", "Juri", "Kamalganj", "Kulaura", "Moulvibazar Sadar"],
  "Sunamganj": ["Bishwamvarpur", "Chhatak", "Derai", "Dharamapasha", "Dowarabazar"],
  "Panchagarh": ["Atwari", "Boda", "Debiganj", "Panchagarh Sadar", "Tetulia"],
  "Thakurgaon": ["Baliadangi", "Haripur", "Pirganj", "Ranisankail", "Thakurgaon Sadar"],
  "Nilphamari": ["Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Nilphamari Sadar"],
  "Lalmonirhat": ["Aditmari", "Hatibandha", "Kaliganj", "Lalmonirhat Sadar", "Patgram"],
  "Kurigram": ["Bhurungamari", "Char Rajibpur", "Chilmari", "Kurigram Sadar", "Nageshwari"],
  "Gaibandha": ["Fulchhari", "Gaibandha Sadar", "Gobindaganj", "Palashbari", "Sadullapur"],
  "Jaipurhat": ["Akkelpur", "Jaipurhat Sadar", "Kalai", "Khetlal", "Panchbibi"],
  "Chapainawabganj": ["Bholahat", "Gomastapur", "Nachole", "Nawabganj Sadar", "Shibganj"],
  "Naogaon": ["Atrai", "Badalgachhi", "Dhamoirhat", "Manda", "Mahadebpur"],
  "Natore": ["Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Natore Sadar"],
  "Sirajganj": ["Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj"],
  "Bagerhat": ["Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat"],
  "Chuadanga": ["Alamdanga", "Chuadanga Sadar", "Damurhuda", "Jibannagar"],
  "Jhenaidah": ["Harinakunda", "Jhenaidah Sadar", "Kaliganj", "Kotchandpur", "Maheshpur"],
  "Magura": ["Magura Sadar", "Mohammadpur", "Salikha", "Sreepur"],
  "Meherpur": ["Gangni", "Meherpur Sadar", "Mujibnagar"],
  "Narail": ["Kalia", "Lohagara", "Narail Sadar"],
  "Satkhira": ["Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Satkhira Sadar"],
  "Bhola": ["Bhola Sadar", "Burhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan"],
  "Jhalokati": ["Jhalokati Sadar", "Kathalia", "Nalchity", "Rajapur"],
  "Patuakhali": ["Bauphal", "Dashmina", "Dumki", "Galachipa", "Kalapara"],
  "Pirojpur": ["Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Pirojpur Sadar"],
  "Barguna": ["Amtali", "Bamna", "Barguna Sadar", "Betagi", "Patharghata"],
  "Netrokona": ["Atpara", "Barhatta", "Durgapur", "Khaliajuri", "Kalmakanda"],
  "Sherpur": ["Jhenaigati", "Nakla", "Nalitabari", "Sherpur Sadar", "Sreebardi"]
};

export default function Checkout({ onNavigate }: CheckoutProps) {
  const { cart, clearCart } = useCart();
  const [customer, setCustomer] = useState<Customer>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedThana, setSelectedThana] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  // Calculate shipping based on district
  const getShippingCost = () => {
    if (cart.total >= 500) return 0;
    return selectedDistrict === 'Rajshahi' ? 40 : 120;
  };

  const shipping = getShippingCost();
  const total = cart.total + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process order
    alert('Order placed successfully! We will contact you soon.');
    clearCart();
    onNavigate('home');
  };

  const updateCustomer = (field: keyof Customer, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
  };

  const districts = Object.keys(bangladeshData);
  const thanas = selectedDistrict ? bangladeshData[selectedDistrict as keyof typeof bangladeshData] : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => onNavigate('cart')}
            className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Cart
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.firstName}
                      onChange={(e) => updateCustomer('firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.lastName}
                      onChange={(e) => updateCustomer('lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => updateCustomer('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => updateCustomer('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    value="Bangladesh"
                    disabled
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={customer.address}
                    onChange={(e) => updateCustomer('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter your full address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      District *
                    </label>
                    <select
                      required
                      value={selectedDistrict}
                      onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        setSelectedThana(''); // Reset thana when district changes
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select District</option>
                      {districts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thana/Upazilla *
                    </label>
                    <select
                      required
                      value={selectedThana}
                      onChange={(e) => setSelectedThana(e.target.value)}
                      disabled={!selectedDistrict}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:bg-gray-100"
                    >
                      <option value="">Select Thana</option>
                      {thanas.map((thana) => (
                        <option key={thana} value={thana}>
                          {thana}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Note (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Any special instructions for your order..."
                  />
                </div>

                {/* Payment Method */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                        required
                      />
                      <Banknote className="h-5 w-5 text-gray-600 ml-3 mr-3" />
                      <div>
                        <span className="font-medium">Cash on Delivery</span>
                        <p className="text-sm text-gray-600">Pay when you receive your order</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="online"
                        checked={paymentMethod === 'online'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                        required
                      />
                      <CreditCard className="h-5 w-5 text-gray-600 ml-3 mr-3" />
                      <div>
                        <span className="font-medium">Online Payment</span>
                        <p className="text-sm text-gray-600">Pay with card, bKash, Nagad, Rocket</p>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.product.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">৳{item.product.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Shipping Info */}
              {selectedDistrict && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm text-blue-800">
                      Shipping to: {selectedDistrict}
                      {selectedThana && `, ${selectedThana}`}
                    </span>
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">৳{cart.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `৳${shipping}`}
                  </span>
                </div>
                {cart.total >= 500 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-800 text-sm font-medium">
                      🎉 You qualify for free shipping!
                    </p>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>৳{total}</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-gray-700 font-medium">
                    Your information is secure and encrypted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}