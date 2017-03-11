export abstract class BaseController {

  public abstract load (conditions: any): Promise<any>;
}
