import React from 'react';
import { Grid, Typography, Chip, Avatar } from '@mui/material';
import { FormatQuote as QuoteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const CustomChip = styled(Chip)(({theme}) => ({
    padding: theme.spacing(1),
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    '& .MuiChip-label': { overflowWrap: 'break-word', whiteSpace: 'normal', textOverflow: 'clip' }
}));

const Testimonials = () => {
    const testimonials = [
        {
            text: "The Smart Insulin Pen has completely transformed my daily routine. It's easy to use and syncs all data to my phone. Can't imagine my life without it!",
            author: 'Jane D.',
            file: 'jane.jpg',
        },
        {
            text: "The remote monitoring service from MedTechWare gives me peace of mind. I feel cared for and protected. It's a game-changer for sure!",
            author: 'Michael S.',
            file: 'michael.jpg',
        },
        {
            text: "I'm obsessed with the Fitness Tracker. It helps me stay motivated and on track with my fitness goals. It's incredibly accurate and easy to use!",
            author: 'Lisa K.',
            file: 'lisa.jpg',
        },
        {
            text: "The Telemedicine Kit is such a convenient way to have my routine check-ups, especially during these times. It's user-friendly and I can easily share data with my doctor.",
            author: 'Robert L.',
            file: 'robert.jpg',
        },
        {
            text: "I can't recommend MedTechWare enough! Their products have made a huge difference in managing my health. I especially love the Continuous Glucose Monitor, it's a lifesaver for a diabetic like me.",
            author: 'Emma T.',
            file: 'emma.jpg',
        },
    ];

    return (
        <Grid container spacing={2}>
          {testimonials.map((testimonial, index) => (
              <Grid item xs={12} key={index}>
                <CustomChip
                  avatar={
                      <Avatar
                        style={{
                            filter: 'saturate(0.7) contrast(0.9)',
                            height: 64,
                            width: 64
                        }}
                        src={'/fake-profiles/' + testimonial.file}
                      >
                        {testimonial.author[0]}
                      </Avatar>
                  }
                  label={
                      <>
                        <Typography
                          variant="body2"
                          component="span"
                          color="textPrimary"
                        >
                          <QuoteIcon style={{ marginRight: '0.5rem' }} />
                          {testimonial.text}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="span"
                          color="textSecondary"
                          style={{ marginTop: '0.5rem', textAlign: 'end' }}>
                          - {testimonial.author}
                        </Typography>
                      </>
                  }
                  variant="filled"
                />
              </Grid>
          ))}
        </Grid>
    );
};

export default Testimonials;
//avatar={<Avatar style={{ height: 64, width: 64}}>{testimonial.author[0]}</Avatar>}
