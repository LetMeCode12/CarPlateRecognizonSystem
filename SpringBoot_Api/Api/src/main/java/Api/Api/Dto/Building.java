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

@JsonIgnoreProperties({"gates"})
@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "Buildings")
public class Building {
    @Column(name = "building_id")
    @Id
    @Type(type = "uuid-char")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @Column(unique = true)
    private String Nr;
    @OneToMany(mappedBy = "building", cascade = CascadeType.ALL)
    private List<Place> places;
    @JsonProperty("gates")
    @ManyToMany(mappedBy = "buildings", cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private List<Gate> gates;

}
