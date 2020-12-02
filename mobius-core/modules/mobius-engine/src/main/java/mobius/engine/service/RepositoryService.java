package mobius.engine.service;

import mobius.engine.service.repository.ModelQuery;

public interface RepositoryService {

    /**
     * Query models.
     */
    public ModelQuery createModelQuery();
}
