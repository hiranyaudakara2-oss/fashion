import ProductGallery from '../components/ProductGallery';
import PageTransition from '../components/PageTransition';

export default function Products() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-24">
        <main>
          <ProductGallery />
        </main>
      </div>
    </PageTransition>
  );
}
