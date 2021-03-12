package Api.Api.Dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@JsonIgnoreProperties({"building"})
@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "Places")
public class Place {

    @Id
    @Type(type = "uuid-char")
    @Column(name = "place_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String nr;
    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonProperty("building")
    @JoinColumn(name = "building_id", referencedColumnName = "building_id")
    private Building building;
    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
    private List<User> users;
    @OneToMany(mappedBy = "place", cascade = CascadeType.ALL)
    private List<Car> cars;

}
