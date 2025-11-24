import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Plane, Wine, Car, Phone, Star } from 'lucide-react';

const LifestyleConciergeTab = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLifestyleEvents();
  }, []);

  const fetchLifestyleEvents = async () => {
    // Using mock data for now
    setLoading(false);
  };

  const conciergeServices = [
    {
      id: 1,
      name: 'Private Jet Charter',
      description: 'Luxury air travel arrangements worldwide',
      icon: <Plane className="w-6 h-6" />,
      tier: 'Legend',
      available: true
    },
    {
      id: 2,
      name: 'Fine Dining Reservations',
      description: 'Exclusive restaurant bookings and chef experiences',
      icon: <Wine className="w-6 h-6" />,
      tier: 'Elite',
      available: true
    },
    {
      id: 3,
      name: 'Luxury Transportation',
      description: 'Premium car service and exotic rentals',
      icon: <Car className="w-6 h-6" />,
      tier: 'Verified',
      available: true
    },
    {
      id: 4,
      name: 'Event Planning',
      description: 'Bespoke experiences and celebration coordination',
      icon: <Calendar className="w-6 h-6" />,
      tier: 'Elite',
      available: true
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'CrypDawgs Miami Yacht Party',
      date: '2024-03-15',
      location: 'Miami Beach, FL',
      tier: 'Legend',
      status: 'Open'
    },
    {
      id: 2,
      title: 'Private Art Gallery Opening',
      date: '2024-03-22',
      location: 'SoHo, NYC',
      tier: 'Elite',
      status: 'Waitlist'
    },
    {
      id: 3,
      title: 'Michelin Star Chef Experience',
      date: '2024-04-05',
      location: 'Napa Valley, CA',
      tier: 'Verified',
      status: 'Open'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
          Lifestyle Concierge
        </h2>
        <p className="text-muted-foreground text-lg">
          Exclusive experiences and premium services for vault members
        </p>
      </div>

      {/* Concierge Services */}
      <Card className="luxury-card border-luxury-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-luxury-gold" />
            Premium Services
          </CardTitle>
          <CardDescription>
            24/7 concierge support for all your luxury needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conciergeServices.map((service) => (
              <Card key={service.id} className="border-luxury-purple/10">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-luxury-purple/20 text-luxury-purple">
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{service.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{service.tier}+ Tier</Badge>
                        <Button size="sm" variant="ghost" className="text-luxury-purple">
                          Request
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle>Exclusive Events</CardTitle>
          <CardDescription>Member-only gatherings and experiences</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="luxury-spinner mx-auto mb-4" />
              <p className="text-muted-foreground">Loading events...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="border-luxury-purple/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-luxury-purple/20">
                          <Calendar className="w-5 h-5 text-luxury-purple" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{event.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(event.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </span>
                          </div>
                          <Badge variant="outline" className="mt-2">{event.tier} Members</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={event.status === 'Open' ? 'default' : 'secondary'}
                          className="mb-2"
                        >
                          {event.status}
                        </Badge>
                        <Button size="sm" className="luxury-button block">
                          {event.status === 'Open' ? 'RSVP' : 'Join Waitlist'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Travel Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="luxury-card border-luxury-purple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-luxury-purple" />
              Travel Concierge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Private Jet Access</span>
                <Star className="w-4 h-4 text-luxury-gold" />
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Luxury Hotel Bookings</span>
                <Star className="w-4 h-4 text-luxury-gold" />
              </div>
              <div className="flex justify-between">
                <span className="text-sm">VIP Airport Services</span>
                <Star className="w-4 h-4 text-luxury-gold" />
              </div>
            </div>
            <Button className="w-full luxury-button">
              Plan Your Trip
            </Button>
          </CardContent>
        </Card>

        <Card className="luxury-card border-luxury-gold/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wine className="w-5 h-5 text-luxury-gold" />
              Dining Experiences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Michelin Star Reservations</span>
                <Star className="w-4 h-4 text-luxury-gold" />
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Private Chef Services</span>
                <Star className="w-4 h-4 text-luxury-gold" />
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Wine Cellar Tours</span>
                <Star className="w-4 h-4 text-luxury-gold" />
              </div>
            </div>
            <Button className="w-full luxury-button">
              Book Experience
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Contact Concierge */}
      <Card className="luxury-card border-luxury-gold/20">
        <CardHeader>
          <CardTitle className="text-luxury-gold">Personal Concierge</CardTitle>
          <CardDescription>
            Dedicated support for all your luxury lifestyle needs
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="p-6 rounded-lg bg-luxury-gold/10 border border-luxury-gold/20">
            <Phone className="w-12 h-12 mx-auto mb-3 text-luxury-gold" />
            <h3 className="text-lg font-semibold mb-2">24/7 Concierge Line</h3>
            <p className="text-muted-foreground mb-4">
              Connect with your personal concierge for any request
            </p>
            <Button className="luxury-button">
              Contact Concierge
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LifestyleConciergeTab;