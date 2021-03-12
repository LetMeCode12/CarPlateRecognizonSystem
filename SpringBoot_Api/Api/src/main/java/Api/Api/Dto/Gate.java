package Api.Api.Dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
@Entity
@Table(name = "Gates")
public class Gate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gate_id")
    private Integer nr;
    @JoinTable(name = "gates_buildings", joinColumns = {@JoinColumn(name = "gate_id")}, inverseJoinColumns = {@JoinColumn(name = "building_id")})
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    private List<Building> buildings;

}
