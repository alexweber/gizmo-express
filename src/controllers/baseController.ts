import mongoose = require('mongoose');
import { Document }  from 'mongoose';

export abstract class BaseController {

  public abstract load (conditions: any): Promise<Document>;
}
