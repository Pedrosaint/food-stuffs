import withLayout from '../../../general/Hoc/header-and-footer'
import Hero1 from '../components/hero/hero1'
import Hero2 from '../components/hero2/hero2'
import Hero3 from "../components/hero3/hero3"
import Hero4 from "../components/hero4/hero4"

const LandingPageView = () => {
  return (
   <>
   <Hero1 />
   <Hero2 />
   <Hero3 />
   <Hero4 />
   </>
  )
}

export default withLayout(LandingPageView)
