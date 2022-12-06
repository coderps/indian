import { Grid } from '@mui/material';
import Form from './form/form';
import CustomizedAccordions from './faqs/accordian';
import BasicCard from './general/card';
import Header from './header/header';
import location from './static/location.svg';
import date from './static/date.svg';
import couple from './static/couple.svg';
import elephant from './static/elephant.png';
import "./static/style.css";

const Contents = () => {
    const handleClickScroll = () => {
    const element = document.getElementById('faqs');
        if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const welcome_text = <h1>You are cordially invited to share in a celebration of the wedding of Irene and Prakhar!</h1>;

    const loc_link = "https://g.page/royalheritagehaveli?share";
    const loc_details = <>
        Royal Heritage Haveli Jaipur<br/>
        Plot No. 116 & 117<br/>
        Near Khatipura Tiraya<br/>
        Khatipura, Jaipur, Rajasthan 302012 <br/>
        [<a href={loc_link} target="_blank" rel="noreferrer">Google Map Link</a>]
    </>

    const date_time = <>
        3<sup>rd</sup> April, 2023<br/>
        (time will be announced later)
    </>

    const third_thing = <>
        Do you have any more questions? You can either see our <span onClick={handleClickScroll}><a href="#FAQs">FAQs</a></span> or write us here: <a href = "mailto: iraxboda@gmail.com">iraxboda@gmail.com</a> 
    </>

    const cards = <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 3, md: 12 }}>
        <Grid item xs={2} sm={4} md={4}>
            <BasicCard content={date_time} src={date} alt="This is the date and time" title="When" />
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
            <BasicCard content={loc_details} src={location} alt="This is the venue" title="Where" />
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
            <BasicCard content={third_thing} src={couple} alt="More questions" title="Questions?" />
        </Grid>
    </Grid>

    const FAQs = <div className='faqs'>
        <h1 id="faqs">FAQs</h1>
        <div className='accordian'>
            <CustomizedAccordions />
        </div>
    </div>
    

    const googleForm = <div className='google-form'><h1>Please confirm your presence below:</h1><br/><Form /></div>
    const footer = <footer>
        <h1>Looking forward to seeing you!</h1>
        <img src={elephant} alt="elephant" />
    </footer>

    return <>
        <Header />
        <br /><br />
        {welcome_text}
        <br /><br />
        {cards}
        <br /><br />
        {googleForm}
        <br /><br />
        {FAQs}
        <br /><br />
        {footer}
    </>
}

export default Contents;