import React from 'react';
import { useNavigate } from 'react-router-dom';

const Resources = () => {
  const navigate = useNavigate();

  const helplines = [
    {
      name: "Madhvi Kshettry",
      description: "Professional therapist in Pune with Masters in Psychology",
      phone: "+91 9158306580",
      hours: "Contact for appointment",
      location: "Pune, Maharashtra"
    },
    {
      name: "AASRA",
      description: "24/7 National Helpline for emotional support and suicide prevention",
      phone: "91-9820466726",
      hours: "24x7",
      website: "http://www.aasra.info/"
    },
    {
      name: "Vandrevala Foundation",
      description: "National Mental health helpline",
      phone: "1860-2662-345",
      phone2: "1800-2333-330",
      hours: "24x7",
      website: "https://www.vandrevalafoundation.com"
    },
    {
      name: "Parivarthan",
      description: "Counselling Helpline",
      phone: "+91-7676602602",
      hours: "Monday to Friday, 4 PM to 10 PM",
      website: "http://parivarthan.org"
    },
    {
      name: "Sneha Foundation",
      description: "24/7 Suicide prevention helpline",
      phone: "044-24640050",
      phone2: "+91-9566027111",
      hours: "24x7",
      website: "https://snehaindia.org"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-green/20 to-white p-4">
      <img 
        src="/favicon.png" 
        alt="Home" 
        className="fixed top-4 left-4 z-50 w-10 h-10 object-contain cursor-pointer hover:scale-110 transition-transform"
        onClick={() => navigate('/')}
      />
      
      <div className="max-w-3xl mx-auto pt-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Mental Health Resources</h1>
        <div className="space-y-6">
          {helplines.map((helpline) => (
            <div key={helpline.name} className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{helpline.name}</h2>
              <p className="text-gray-600 mb-3">{helpline.description}</p>
              <div className="space-y-1">
                <p className="text-gray-800">
                  <strong>Phone:</strong>{' '}
                  <a href={`tel:${helpline.phone.replace(/[-\s]/g, '')}`} className="text-emerald-700 hover:text-emerald-900 hover:underline">
                    {helpline.phone}
                  </a>
                  {helpline.phone2 && (
                    <>
                      {' / '}
                      <a href={`tel:${helpline.phone2.replace(/[-\s]/g, '')}`} className="text-emerald-700 hover:text-emerald-900 hover:underline">
                        {helpline.phone2}
                      </a>
                    </>
                  )}
                </p>
                <p className="text-gray-800"><strong>Hours:</strong> {helpline.hours}</p>
                {helpline.location && (
                  <p className="text-gray-800"><strong>Location:</strong> {helpline.location}</p>
                )}
                {helpline.website && (
                  <a 
                    href={helpline.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:text-emerald-900 hover:underline block mt-2"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;