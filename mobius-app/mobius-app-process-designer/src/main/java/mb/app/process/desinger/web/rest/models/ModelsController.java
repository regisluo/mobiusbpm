package mb.app.process.desinger.web.rest.models;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import mb.app.process.desinger.vo.ResultListDataRepresentation;
import mb.app.process.desinger.web.rest.ResourceName;
import mb.app.process.desinger.web.rest.base.BaseController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = BaseController.MB_APP_REST_API_PREFIX + ResourceName.MODELS)
public class ModelsController extends BaseController {

    private ObjectMapper objectMapper = new ObjectMapper();

    private String testResponse = "{\"size\":2,\"total\":2,\"start\":0,\"data\":[{\"id\":\"72e1258a-ce4e-11ea-bc58-9a64fb4d0b59\",\"name\":\"model2\",\"key\":\"model2name\",\"description\":\"model2 desc\",\"createdBy\":\"admin\",\"lastUpdatedBy\":\"admin\",\"lastUpdated\":\"2020-07-25T08:11:31.794+0000\",\"latestVersion\":true,\"version\":1,\"comment\":null,\"modelType\":0,\"tenantId\":null},{\"id\":\"663806f9-ce4e-11ea-bc58-9a64fb4d0b59\",\"name\":\"model1 name\",\"key\":\"model1\",\"description\":\"model1 desc\",\"createdBy\":\"admin\",\"lastUpdatedBy\":\"admin\",\"lastUpdated\":\"2020-07-25T08:11:08.366+0000\",\"latestVersion\":true,\"version\":1,\"comment\":null,\"modelType\":0,\"tenantId\":null}]}";

    @GetMapping(value = "", produces = "application/json")
    public ResultListDataRepresentation getModels(@RequestParam(required = false) String filter,
                                                  @RequestParam(required = false) String sort,
                                                  @RequestParam(required = false) Integer modelType) {
        ResultListDataRepresentation response = null;
        try {
            response = objectMapper.readValue(testResponse, ResultListDataRepresentation.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return response;
    }
}
