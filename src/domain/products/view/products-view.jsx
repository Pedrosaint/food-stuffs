import withLayout from '../../../general/Hoc/header-and-footer'
import Products from '../components/products'

const ProductsView = () => {
  return (
    <>
      <div className=''>
        <Products />
      </div>
    </>
  );
}

export default withLayout(ProductsView)
