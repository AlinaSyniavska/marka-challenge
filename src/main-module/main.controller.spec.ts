import { MainController } from "./main.controller";
import { MainService } from "./main.service";

describe('MainController', () => {
  /*let controller: MainController;
  let service: MainService;

  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainController],
      providers: [MainService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<MainController>(MainController);
    service = module.get<MainService>(MainService);
  });*/

  let mainController: MainController;
  let mainService: MainService;

  beforeEach(() => {
    mainService = new MainService();
    mainController = new MainController(MainService);
  });

  it('should be defined', () => {
    expect(mainController).toBeDefined();
  });
});
