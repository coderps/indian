import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { questions } from './questions';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', color: 'aqua' }} />}
    {...props}
  />
))(({ theme }) => ({
  textAlign: 'left',
  borderBottom: '1px solid rgb(100, 100, 100, 0.8)',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const acss_active = {backgroundColor: 'white', color: 'black'};
  const acss_inactive = {backgroundColor: 'black', color: 'white'};
  const defaultAcss = {
    'panel1': acss_inactive,
    'panel2': acss_inactive,
    'panel3': acss_inactive,
    'panel4': acss_inactive,
    'panel5': acss_inactive,
  };
  
  const [expanded, setExpanded] = React.useState();
  const [acss, setAcss] = React.useState(defaultAcss);

  const getUpdate = (panel) => {
    let updatedAcss = defaultAcss;
    updatedAcss[panel] = acss_active;
    return updatedAcss;
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    setAcss(newExpanded ? getUpdate(panel) : defaultAcss);
  };

  return (
    <div>
      {questions.map((question, idx) => {
          const panel = 'panel' + String(idx+1);
          return <Accordion expanded={expanded === panel} onChange={handleChange(panel)} sx={acss[panel]} key={idx}>
            <AccordionSummary aria-controls={panel + "d-content"} id={panel + "d-header"}>
              <Typography><b>{question.title}</b></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className='acc-inner'>
                {question.qs.map((qna, i) => {
                    return <Typography key={i}>
                      {qna.q === "" ? <></> : <>
                        <b><u>{qna.q}</u></b>
                        <br /><br />
                      </>}
                      {qna.a}
                    </Typography>
                })}
              </div>
            </AccordionDetails>
          </Accordion>
      })}      
    </div>
  );
}
