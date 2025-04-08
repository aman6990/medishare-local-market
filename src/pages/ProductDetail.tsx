import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import ProductImageGallery from '@/components/product-detail/ProductImageGallery';
import ProductInfo from '@/components/product-detail/ProductInfo';
import ProductBenefits from '@/components/product-detail/ProductBenefits';
import ProductDetails from '@/components/product-detail/ProductDetails';
import SimilarProducts from '@/components/product-detail/SimilarProducts';
import UsageInstructions from '@/components/product-detail/UsageInstructions';

// Mock product data based on product ID
const productData = {
  "neurobion-forte": {
    id: "neurobion-forte",
    name: "Neurobion Forte Tablet 30",
    manufacturer: "Procter & Gamble Hygiene & Healthcare Ltd.",
    imageUrl: "/lovable-uploads/26049ee2-384f-47bb-991d-d725f365190b.png",
    packSize: "Strip of 30 Units",
    mrp: 46.1,
    discountPercentage: 20,
    discountedPrice: 36.88,
    pricePerUnit: 1.54,
    description: "Neurobion Forte is a vitamin B complex supplement that helps relieve tingling, numbness, and weakness due to vitamin B deficiency.",
    dosage: "2 tablets a day or as directed by your physician.",
    mainBenefits: [
      "Helps relieve tingling sensations",
      "Reduces numbness in extremities",
      "Alleviates weakness caused by vitamin B deficiency",
      "Supports nerve health and function"
    ],
    composition: [
      { name: "Calcium Pantothenate", amount: "50 Mg" },
      { name: "Cyanocobalamin", amount: "15 Mcg" },
      { name: "Nicotinamide", amount: "45 Mg" },
      { name: "Pyridoxine Hydrochloride", amount: "3 Mg" },
      { name: "Riboflavin Sodium Phosphate", amount: "10 Mg" },
      { name: "Thiamine Hydrochloride", amount: "10 Mg" }
    ],
    storage: "Store below 30°C in a cool, dry place away from direct sunlight."
  },
  "skin-care": {
    id: "skin-care",
    name: "Advanced Skin Care Products",
    manufacturer: "Derma Solutions Inc.",
    imageUrl: "https://storage.googleapis.com/a1aa/image/yYHCNMi3HT_g0O0ARYXB4TH7zLqusPEsVIvxnHGl9mE.jpg",
    packSize: "Kit of 3 Items",
    mrp: 89.99,
    discountPercentage: 50,
    discountedPrice: 45.00,
    pricePerUnit: 15.00,
    description: "Complete skin care solution with cleanser, toner, and moisturizer for healthy, glowing skin.",
    dosage: "Use morning and evening as part of your daily skincare routine.",
    mainBenefits: [
      "Deep cleansing and pore reduction",
      "Hydrates and nourishes skin",
      "Reduces fine lines and wrinkles",
      "Improves skin elasticity"
    ],
    composition: [
      { name: "Hyaluronic Acid", amount: "2%" },
      { name: "Vitamin C", amount: "5%" },
      { name: "Niacinamide", amount: "10%" },
      { name: "Natural Extracts", amount: "3%" }
    ],
    storage: "Store in a cool, dry place. Keep tightly closed when not in use."
  },
  "hair-care": {
    id: "hair-care",
    name: "Natural Herbal Shampoo",
    manufacturer: "Herbal Essences Co.",
    imageUrl: "https://storage.googleapis.com/a1aa/image/LnlwQS1ZyTMOjpRlSmrJhnmtKwVhM-SjA1M7b54KSXo.jpg",
    packSize: "Bottle of 250ml",
    mrp: 35.50,
    discountPercentage: 50,
    discountedPrice: 17.75,
    pricePerUnit: 7.10,
    description: "Natural herbal shampoo that strengthens hair from root to tip and prevents hair fall.",
    dosage: "Apply to wet hair, massage gently, and rinse thoroughly.",
    mainBenefits: [
      "Reduces hair fall and breakage",
      "Strengthens hair follicles",
      "Adds shine and volume",
      "Soothes scalp irritation"
    ],
    composition: [
      { name: "Aloe Vera Extract", amount: "5%" },
      { name: "Amla Extract", amount: "3%" },
      { name: "Bhringraj", amount: "2%" },
      { name: "Vitamin E", amount: "1%" }
    ],
    storage: "Store in a cool, dry place away from direct sunlight."
  },
  "baby-care": {
    id: "baby-care",
    name: "Baby Care Essentials",
    manufacturer: "Johnson & Johnson",
    imageUrl: "https://storage.googleapis.com/a1aa/image/ufwsw1MUzpbNFmrf6WN1Hk0bZ4J_3u5peGfhAmo6Vf8.jpg",
    packSize: "Set of 5 Items",
    mrp: 59.99,
    discountPercentage: 50,
    discountedPrice: 30.00,
    pricePerUnit: 6.00,
    description: "Complete baby care kit with gentle products specially formulated for baby's sensitive skin.",
    dosage: "Use as needed during baby's bath time and diaper changes.",
    mainBenefits: [
      "Gentle on baby's sensitive skin",
      "No tears formula",
      "Hypoallergenic formula",
      "Moisturizes and protects"
    ],
    composition: [
      { name: "Chamomile Extract", amount: "2%" },
      { name: "Aloe Vera", amount: "3%" },
      { name: "Vitamin E", amount: "1%" },
      { name: "Glycerin", amount: "5%" }
    ],
    storage: "Store at room temperature away from direct sunlight."
  },
  "new-product-1": {
    id: "new-product-1",
    name: "Advanced Vitamin C Serum",
    manufacturer: "SkinBright Labs",
    imageUrl: "https://storage.googleapis.com/a1aa/image/uzmLjwq37nMh354nzYRTIJz8k8f6y1bGE971F_tB6Cc.jpg",
    packSize: "30ml Bottle",
    mrp: 49.99,
    discountPercentage: 10,
    discountedPrice: 44.99,
    pricePerUnit: 1.50,
    description: "Advanced Vitamin C serum that brightens skin tone, reduces dark spots, and boosts collagen production.",
    dosage: "Apply 3-4 drops to clean, dry skin in the morning and evening.",
    mainBenefits: [
      "Brightens skin tone",
      "Reduces hyperpigmentation",
      "Boosts collagen production",
      "Provides antioxidant protection"
    ],
    composition: [
      { name: "L-Ascorbic Acid", amount: "20%" },
      { name: "Vitamin E", amount: "1%" },
      { name: "Ferulic Acid", amount: "0.5%" },
      { name: "Hyaluronic Acid", amount: "1%" }
    ],
    storage: "Store in a cool, dark place. Refrigeration recommended after opening."
  },
  "new-product-2": {
    id: "new-product-2",
    name: "Natural Herbal Shampoo",
    manufacturer: "Organic Essentials",
    imageUrl: "https://storage.googleapis.com/a1aa/image/_wlXESmp3g1kAOv4k64CHcYqjQ8joqMdzxQJ0Ois7L8.jpg",
    packSize: "200ml Bottle",
    mrp: 29.99,
    discountPercentage: 15,
    discountedPrice: 25.49,
    pricePerUnit: 0.13,
    description: "Sulfate-free herbal shampoo that cleanses and nourishes all hair types with natural ingredients.",
    dosage: "Apply to wet hair, massage into scalp, and rinse thoroughly.",
    mainBenefits: [
      "Cleanses without stripping natural oils",
      "Strengthens hair strands",
      "Promotes healthy scalp",
      "Adds natural shine"
    ],
    composition: [
      { name: "Amla Extract", amount: "5%" },
      { name: "Shikakai", amount: "3%" },
      { name: "Aloe Vera", amount: "2%" },
      { name: "Coconut Oil", amount: "1%" }
    ],
    storage: "Store at room temperature away from direct sunlight."
  },
  "new-product-3": {
    id: "new-product-3",
    name: "Baby Care Essentials",
    manufacturer: "Baby Bliss",
    imageUrl: "https://storage.googleapis.com/a1aa/image/G6MocX4gXORoT55bT4ebty3P1i6n8t8PJwOMC0FOY-o.jpg",
    packSize: "Gift Set",
    mrp: 39.99,
    discountPercentage: 20,
    discountedPrice: 31.99,
    pricePerUnit: 5.33,
    description: "Complete baby care kit with gentle lotion, soap, powder, and oil for your baby's delicate skin.",
    dosage: "Use during bath time and as needed for baby care.",
    mainBenefits: [
      "Gentle and mild formulation",
      "Free from harmful chemicals",
      "Soothes and protects baby's skin",
      "Dermatologically tested"
    ],
    composition: [
      { name: "Chamomile Extract", amount: "2%" },
      { name: "Olive Oil", amount: "3%" },
      { name: "Aloe Vera", amount: "2%" },
      { name: "Calendula", amount: "1%" }
    ],
    storage: "Store in a cool, dry place away from direct sunlight."
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  
  useEffect(() => {
    // Get product data based on ID from URL
    if (id && productData[id as keyof typeof productData]) {
      setProduct(productData[id as keyof typeof productData]);
    } else {
      // Fallback to the first product if ID not found
      setProduct(productData["neurobion-forte"]);
    }
  }, [id]);
  
  // If product not loaded yet, show loading
  if (!product) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  return (
    <div className="pb-16 bg-gray-50 min-h-screen">
      <Header />
      
      <ProductImageGallery imageUrl={product.imageUrl} name={product.name} />
      
      <ProductInfo
        name={product.name}
        manufacturer={product.manufacturer}
        packSize={product.packSize}
        mrp={product.mrp}
        discountPercentage={product.discountPercentage}
        discountedPrice={product.discountedPrice}
        pricePerUnit={product.pricePerUnit}
      />
      
      <ProductBenefits benefits={product.mainBenefits} />
      
      <ProductDetails
        composition={product.composition}
        storage={product.storage}
        description={product.description}
        dosage={product.dosage}
      />
      
      <SimilarProducts />
      
      <UsageInstructions />
      
      <BottomNav />
    </div>
  );
};

export default ProductDetail;
