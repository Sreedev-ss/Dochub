import { Request } from 'express';

interface RequestDefenition extends Request {
  user: object
}

export default RequestDefenition;