import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

const VaultProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [reservingId, setReservingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts((data as unknown as Product[]) || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async (productId: string) => {
    setReservingId(productId);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('reservations' as any)
        .insert({
          user_id: user.id,
          product_id: productId
        });

      if (error) throw error;

      // Play success sound
      if (typeof Audio !== 'undefined') {
        try {
          const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBz2QzfLNeSsFJIHK8d2ORg0PVqzh7KtWFQo8lNvxuVkZCjWR1fLZfS4HKHvL8uGLRg0PUqzj6qpYFAo8ldxwuFYYCzTZ1fLZfSwGKH7L8uCLRg0PV6zh7K0');
          audio.volume = 0.3;
          audio.play().catch(() => {});
        } catch (e) {}
      }

      toast({
        title: "Reserved Successfully!",
        description: "Your product has been reserved. You'll be notified when it's available.",
        className: "luxury-toast-success",
      });
    } catch (error) {
      console.error('Error making reservation:', error);
      toast({
        title: "Reservation Failed",
        description: "Unable to reserve this product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setReservingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="luxury-spinner" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-gold bg-clip-text text-transparent">
          Exclusive Drop Collections
        </h3>
        <p className="text-muted-foreground">Reserve your limited edition items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="luxury-card group hover:scale-[1.02] luxury-transition hover:shadow-glow cursor-pointer overflow-hidden"
          >
            {product.image_url && (
              <div className="aspect-square overflow-hidden rounded-t-xl">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 luxury-transition"
                />
              </div>
            )}
            
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h4 className="text-xl font-semibold">{product.name}</h4>
                <p className="text-muted-foreground text-sm">{product.description}</p>
                {product.category && (
                  <span className="inline-block px-3 py-1 bg-luxury-purple/20 text-luxury-purple text-xs rounded-full">
                    {product.category}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-luxury-gold">
                  ${product.price?.toLocaleString() || 'TBA'}
                </div>
                
                <Button
                  onClick={() => handleReserve(product.id)}
                  disabled={reservingId === product.id}
                  className="luxury-button hover:scale-105 luxury-transition"
                  size="sm"
                >
                  {reservingId === product.id ? (
                    <div className="luxury-spinner w-4 h-4" />
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Reserve
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <div className="text-6xl">🎁</div>
          <h4 className="text-xl font-semibold">No Products Available</h4>
          <p className="text-muted-foreground">Check back soon for exclusive drops!</p>
        </div>
      )}
    </div>
  );
};

export default VaultProducts;