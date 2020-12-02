package mobius.rest.iam;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import mobius.rest.api.resource.ResourceNames;
import mobius.rest.api.resource.user.UsersResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for Users resource
 */
@RestController
@RequestMapping(value = ResourceNames.BASE_URL + ResourceNames.USERS)
public class UsersController implements UsersResource {
    private ObjectMapper objectMapper = new ObjectMapper();
    private String testResponse = "{\"id\":\"admin\",\"firstName\":\"Test\",\"lastName\":\"Administrator\",\"email\":\"admin@flowable.org\",\"fullName\":\"Test Administrator\",\"tenantId\":null,\"groups\":[],\"privileges\":[\"access-idm\",\"access-rest-api\",\"access-task\",\"access-modeler\",\"access-admin\"]}";

    /**
     * GET app/rest/users -> get the current user.
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
