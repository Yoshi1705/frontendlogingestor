import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const LogCard = ({ log }) => {
  return (
    <Card elevation={3} style={{ marginBottom: '10px' , minHeight:250}}>
      <CardContent>
        <Typography variant="h6" color="error">
          {log.level}
        </Typography>

        <Typography variant="body1">{log.message}</Typography>

        <Typography variant="body2" color="textSecondary">
          <strong>Resource ID:</strong> {log.resourceId}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          <strong>Timestamp:</strong> {log.timestamp}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          <strong>Trace ID:</strong> {log.traceId}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          <strong>Span ID:</strong> {log.spanId}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          <strong>Commit:</strong> {log.commit}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          <strong>Parent Resource ID:</strong> {log.metadata.parentResourceId}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LogCard;
