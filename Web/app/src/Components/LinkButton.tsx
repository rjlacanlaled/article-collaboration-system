import React from 'react'
import Button from '@mui/material/Button';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

function LinkButton(props: any) {
  return (
    <div>
      <Button
        variant="contained"
        size="small"
        startIcon={<ArticleOutlinedIcon />}
        href={props.articlelink}
        target="_blank" 
        rel="noopener noreferrer" 
      >
        {props.label}
      </Button>
    </div>
  )
}

export default LinkButton