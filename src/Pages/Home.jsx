import { Box, Grid, GridItem, Heading, LinkBox, LinkOverlay,Text } from '@chakra-ui/react'
import React from 'react'
import "./Home.css"
const Home = () => {
  return (
    <div className='maincontt'>
        <div className="homecont">




        <Grid templateColumns='repeat(3, 1fr)' gap={3}>
        <GridItem className='gridd'>
        <LinkBox as='article' maxW='sm' p='5' borderWidth='1px' rounded='md' className='boxy'>
        <Heading size='md' my='2'>
            <LinkOverlay href='/analyse'>
            Analyse your resume
            </LinkOverlay>
        </Heading>
        <Text>
            Analyse your resume and check your strengths,weaknesses and room of improvements
        </Text>
        </LinkBox>
        </GridItem>
        <GridItem className='gridd'>
        <LinkBox as='article' maxW='sm' p='5' borderWidth='1px' rounded='md' className='boxy'>
        <Heading size='md' my='2'>
            <LinkOverlay href='/compare'>
            Compare Two resumes
            </LinkOverlay>
        </Heading>
        <Text>
            Compare two resumes and find out which one is better, friendly rivalry is always better
        </Text>
        </LinkBox>
        </GridItem>
        <GridItem className='gridd'>
        <LinkBox as='article' maxW='sm' p='5' borderWidth='1px' rounded='md' className='boxy'>
        <Heading size='md' my='2'>
            <LinkOverlay href='/create'>
            Create your resume Blueprint

            </LinkOverlay>
        </Heading>
        <Text>
            Can not visuaize your resume? Add your information and visualise your resume blueprint!
        </Text>
        </LinkBox>
        </GridItem>
        </Grid>
        
        </div>
    </div>
  )
}

export default Home