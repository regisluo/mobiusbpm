package mb.app.process.desinger.web.rest.iam;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import mb.app.process.desinger.vo.UserRepresentation;
import mb.app.process.desinger.web.rest.ResourceName;
import mb.app.process.desinger.web.rest.base.BaseController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = BaseController.API_PREFIX+ ResourceName.ACCOUNT)
public class AuthController {
    private ObjectMapper objectMapper = new ObjectMapper();
    private String testResponse = "{\"id\":\"admin\",\"firstName\":\"Test\",\"lastName\":\"Administrator\",\"email\":\"admin@flowable.org\",\"fullName\":\"Test Administrator\",\"tenantId\":null,\"groups\":[],\"privileges\":[\"access-idm\",\"access-rest-api\",\"access-task\",\"access-modeler\",\"access-admin\"]}";

    /**
     * GET /rest/account -> get the current user.
     */
    @GetMapping(value = "", produces = "application/json")
    public UserRepresentation getAccount() {
        UserRepresentation userRepresentation = null;
        try {
            userRepresentation = objectMapper.readValue(testResponse, UserRepresentation.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return userRepresentation;
    }

}
