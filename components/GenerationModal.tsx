
import React, { useState, FormEvent, useEffect } from 'react';
import { OfferBlock, CustomerDetails } from '../types';
import BlockCard from './BlockCard';

interface GenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerBlocks: OfferBlock[];
}

const initialCustomerDetails: CustomerDetails = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
};

const GenerationModal: React.FC<GenerationModalProps> = ({ isOpen, onClose, offerBlocks }) => {
  const [step, setStep] = useState(1);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(initialCustomerDetails);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setCustomerDetails(initialCustomerDetails);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (customerDetails.firstName && customerDetails.lastName && customerDetails.email) {
      setStep(2);
    } else {
      alert('Proszę wypełnić co najmniej Imię, Nazwisko i E-mail.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-slate-800">
              {step === 1 ? 'Krok 1: Wprowadź Dane Klienta' : 'Krok 2: Wygenerowana Oferta'}
            </h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {step === 1 && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">Imię</label>
                  <input type="text" name="firstName" id="firstName" value={customerDetails.firstName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">Nazwisko</label>
                  <input type="text" name="lastName" id="lastName" value={customerDetails.lastName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">E-mail</label>
                <input type="email" name="email" id="email" value={customerDetails.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Nr telefonu</label>
                <input type="tel" name="phone" id="phone" value={customerDetails.phone} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-slate-700">Adres</label>
                <input type="text" name="address" id="address" value={customerDetails.address} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div className="pt-4 flex justify-end">
                <button type="submit" className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-colors">
                  Generuj Ofertę
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="mt-6">
              <div className="bg-slate-50 p-4 rounded-lg mb-6 border">
                <h3 className="font-bold text-lg text-slate-700 mb-2">Dane Odbiorcy:</h3>
                <p className="text-slate-600"><strong>Imię i Nazwisko:</strong> {customerDetails.firstName} {customerDetails.lastName}</p>
                <p className="text-slate-600"><strong>Email:</strong> {customerDetails.email}</p>
                {customerDetails.phone && <p className="text-slate-600"><strong>Telefon:</strong> {customerDetails.phone}</p>}
                {customerDetails.address && <p className="text-slate-600"><strong>Adres:</strong> {customerDetails.address}</p>}
              </div>

              <div className="space-y-4">
                {offerBlocks.map((block, index) => (
                  <BlockCard key={`${block.id}-${index}`} block={block} />
                ))}
              </div>

              <div className="mt-8 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-r-lg">
                <p className="font-bold">Sukces!</p>
                <p>Twoja oferta specjalna została pomyślnie wygenerowana. W rzeczywistej aplikacji zostałaby teraz wysłana na podany adres e-mail.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerationModal;
